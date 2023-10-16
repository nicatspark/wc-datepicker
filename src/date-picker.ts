import { LitElement, html, PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './datepicker-calendar'
import { styles } from './date-picker.css'

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
    //
    if (this.range) {
      const calendarEl = this.shadowRoot?.querySelectorAll(
        'datepicker-calendar'
      )
      const previousRange = this.selectedDateRange
      const endDateBeforeStartDate =
        this.selectedDate &&
        previousRange.start &&
        this.selectedDate > previousRange.start
      const bothDateSet = previousRange.start && previousRange.end
      if (bothDateSet || endDateBeforeStartDate) {
        this.selectedDateRange = {
          start: null,
          end: null,
        }
      }
      const updateObj = previousRange.start
        ? { end: (e as CustomEvent).detail }
        : { start: (e as CustomEvent).detail }
      this.selectedDateRange = {
        ...previousRange,
        ...updateObj,
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
    // if (changedProperties.has('_date')) {
    //   this.datePlusOneMonth = new Date(
    //     this._date.getFullYear(),
    //     this._date.getMonth() + 1,
    //     1
    //   )
    // }
    if (changedProperties.has('selectedDateRange')) {
      console.log(
        '%c selectedDateRange updated',
        'color: red',
        this.selectedDateRange
      )
    }
    if (changedProperties.has('date')) {
      this.datePlusOneMonth = new Date(
        new Date(this.date).getFullYear(),
        new Date(this.date).getMonth() + 1,
        1
      )
      if (new Date(this.date).getFullYear() === 2023)
        console.log('%c Error date', 'color: red')
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
      <slot></slot>
      <div class="triangle"></div>
    `
  }

  private handleChangeCalendarView({
    month,
    year,
  }: {
    month?: number
    year?: number
  }) {
    this.date = `${this._date.getFullYear() + (year ?? 0)}-${
      this._date.getMonth() + (month ?? 0) + 1
    }`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'date-picker': DatePicker
  }
}
