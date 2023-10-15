import { LitElement, html, PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './datepicker-calendar'
import { styles } from './date-picker.css'
import { directive } from 'lit/directive.js'

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
    this.addEventListener('update-calendar-view', this._eventHandler)
    this.addEventListener('selected-date-changed', (e) => {
      this.selectedDate = (e as CustomEvent).detail
      if (this.range) {
        this.selectedDateRange[this.selectedDateRange[0] ? 1 : 0] = (
          e as CustomEvent
        ).detail
      }
    })
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('update-calendar-view', this._eventHandler)
    this.removeEventListener('selected-date-changed', (e) => {
      this.selectedDate = (e as CustomEvent).detail
    })
  }

  private _eventHandler = (e: Event) => {
    this.handleChangeCalendarView((e as CustomEvent).detail)
  }

  @property({ reflect: true })
  locale = 'en-US'

  @state()
  selectedDate: Date | undefined = undefined

  @state()
  selectedDateRange: [Date | null, Date | null] = [null, null]

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
    console.log('changedProperties', changedProperties)
    // if (changedProperties.has('_date')) {
    //   this.datePlusOneMonth = new Date(
    //     this._date.getFullYear(),
    //     this._date.getMonth() + 1,
    //     1
    //   )
    // }
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
