import { LitElement, html, PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './datepicker-calendar'
import { styles } from './date-picker.css'
import { microAnimation } from '@foundit/micro-animations'

interface DateRange {
  start: Date | null
  end: Date | null
}

/**
 * A Date-Picker.
 *
 * @fires selected-date-changed - Indicates when the count changes
 * @slot - This element has a slot
 */
@customElement('date-picker')
export class DatePicker extends LitElement {
  static override styles = styles

  override connectedCallback() {
    super.connectedCallback()
    this.addEventListener('update-calendar-view', this._handleCalendarView)
    this.addEventListener('selected-date-changed', this._handleSelectedDate)
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('update-calendar-view', this._handleCalendarView)
    this.removeEventListener('selected-date-changed', this._handleSelectedDate)
  }

  private _handleCalendarView = (e: Event) => {
    this.handleChangeCalendarView((e as CustomEvent).detail)
  }

  private _handleSelectedDate = (e: Event) => {
    this.selectedDate = (e as CustomEvent).detail
    // range date selection
    if (this.range) {
      const calendarEl = this.shadowRoot?.querySelectorAll(
        'datepicker-calendar'
      )
      const previousRange = this.selectedDateRange
      const endDateBeforeStartDate =
        this.selectedDate &&
        previousRange.start &&
        this.selectedDate < previousRange.start
      const bothDateSet = previousRange.start && previousRange.end
      if (bothDateSet || endDateBeforeStartDate) {
        this.selectedDateRange = {
          start: this.selectedDate || null,
          end: null,
        }
      } else {
        const updateObj = previousRange.start
          ? { end: (e as CustomEvent).detail }
          : { start: (e as CustomEvent).detail }
        this.selectedDateRange = {
          ...previousRange,
          ...updateObj,
        }
      }
      if (this.selectedDateRange.start && this.selectedDateRange.end) {
        const diffTime = Math.abs(
          this.selectedDateRange.end.getTime() -
            this.selectedDateRange.start.getTime()
        )
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
        this.dispatchEvent(
          new CustomEvent('selected-date-range-changed', {
            detail: {
              ...this.selectedDateRange,
              days,
            },
            composed: true,
          })
        )
      }
      // TODO: This should not be neccessary
      if (calendarEl?.length) {
        ;[...calendarEl].forEach((el) => {
          el.selectedDateRange = this.selectedDateRange
        })
      }
    }
    this.requestUpdate()
  }

  @property({ reflect: true })
  locale = 'en-US'

  @state()
  selectedDate: Date | undefined = undefined

  @state()
  selectedDateRange: DateRange = {
    start: null,
    end: null,
  }

  @state()
  private _date = new Date('')

  @property({ type: String, reflect: true })
  date = new Date().toLocaleString(this.locale)

  @state()
  datePlusOneMonth = new Date(
    new Date(this.date).getFullYear(),
    new Date(this.date).getMonth() + 1,
    1
  )

  @property({ type: Boolean })
  range = false

  override willUpdate(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('selectedDateRange') &&
      this.selectedDateRange.start
    ) {
      console.log(
        '%c selectedDateRange updated',
        'color: green; font-weight: bold',
        this.selectedDateRange
      )
    }
    if (changedProperties.has('date')) {
      this.datePlusOneMonth = new Date(
        new Date(this.date).getFullYear(),
        new Date(this.date).getMonth() + 1,
        1
      )
      this._date = new Date(this.date)
      this.datePlusOneMonth = new Date(
        this._date.getFullYear(),
        this._date.getMonth() + 1,
        1
      )
    }
    if (changedProperties.has('locale')) {
      this.date = this._date.toLocaleString(this.locale)
    }
    if (changedProperties.has('range')) {
      this.style.setProperty('--max-width', this.range ? '43em' : '21em')
    }
  }

  override render() {
    return html`
      <div class="calendar-container">
        <div class="calendar-inner-container">
          <datepicker-calendar
            class="start"
            .date=${this._date}
            locale="${this.locale}"
            .range=${this.range}
            selected-date="${this.selectedDate}"
            .selected-date-range=${this.selectedDateRange}
          ></datepicker-calendar>
          <datepicker-calendar
            class="end"
            ?hidden=${!this.range}
            .date=${this.datePlusOneMonth}
            locale="${this.locale}"
            .range=${true}
            selected-date="${this.selectedDate}"
            .selected-date-range=${this.selectedDateRange}
          ></datepicker-calendar>
        </div>
      </div>
      <slot></slot>
      <div class="triangle"></div>
    `
  }

  private async handleChangeCalendarView({ month = 0 }: { month?: number }) {
    const dir = month < 0 ? 1 : -1
    await this._animateView(dir, () => {
      this.date = addMonthsToDate(new Date(this.date), month).toLocaleString(
        this.locale
      )
    })

    function addMonthsToDate(date: Date, months: number): Date {
      const newDate = new Date(date)
      newDate.setMonth(newDate.getMonth() + months)
      return newDate
    }
  }

  private async _animateView(dir: number, cb: () => void) {
    const calendarContainer = this.shadowRoot?.querySelector(
      '.calendar-inner-container'
    )
    if (!calendarContainer) return Promise.resolve()

    await microAnimation({
      element: calendarContainer,
      duration: 100,
      easing: 'ease-in',
      transformEnd: [
        {
          opacity: 0,
          transform: `translateX(calc(16px * ${dir}))`,
        },
      ],
    })
    cb()
    return microAnimation({
      element: calendarContainer,
      duration: 100,
      transformInit: {
        transform: `translateX(${-16 * dir}px)`,
        opacity: 0,
      },
      easing: 'ease-out',
      transformEnd: [
        {
          transform: `translateX(0)`,
          opacity: 1,
        },
      ],
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'date-picker': DatePicker
  }
}
