import { LitElement, html, PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './datepicker-calendar'
import { styles } from './date-picker.css'

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
    this.addEventListener('next-year', () => {
      this.handleChangeCalendarYear('next')
    })
    this.addEventListener('next-month', () => {
      this.handleChangeCalendarMonth('next')
    })
    this.addEventListener('prev-month', () => {
      this.handleChangeCalendarMonth('prev')
    })
    this.addEventListener('prev-year', () => {
      this.handleChangeCalendarYear('prev')
    })
    this.addEventListener('selected-date-changed', (e) => {
      this.selectedDate = (e as CustomEvent).detail
    })
  }
  override disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('next-year', () => {
      this.handleChangeCalendarYear('next')
    })
    this.removeEventListener('next-month', () => {
      this.handleChangeCalendarMonth('next')
    })
    this.removeEventListener('prev-month', () => {
      this.handleChangeCalendarMonth('prev')
    })
    this.removeEventListener('prev-year', () => {
      this.handleChangeCalendarYear('prev')
    })
    this.removeEventListener('selected-date-changed', (e) => {
      this.selectedDate = (e as CustomEvent).detail
    })
  }

  @state()
  selectedDate: Date | undefined = undefined

  @property({ type: Object })
  date = new Date()

  @state()
  datePlusOneMonth = new Date(
    this.date.getFullYear(),
    this.date.getMonth() + 1,
    1
  )

  @property({ type: Boolean })
  range = false

  @property({ reflect: true })
  locale = 'en-US'

  override willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('locale')) {
      this.date = new Date(this.date.toLocaleString(this.locale))
    }
    if (changedProperties.has('range')) {
      this.style.setProperty('--max-width', this.range ? '43em' : '21em')
    }
    if (changedProperties.has('date')) {
      this.datePlusOneMonth = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        1
      )
    }
  }

  override render() {
    return html`
      <div class="calendar-container">
        <datepicker-calendar
          class="start"
          .date="${this.date}"
          locale="${this.locale}"
          ?range="${this.range}"
          selected-date="${this.selectedDate}"
        ></datepicker-calendar>
        <datepicker-calendar
          class="end"
          ?hidden="${!this.range}"
          .date="${this.datePlusOneMonth}"
          locale="${this.locale}"
          range="true"
          selected-date="${this.selectedDate}"
        ></datepicker-calendar>
      </div>
      <slot></slot>
      <div class="triangle"></div>
    `
  }

  private handleChangeCalendarMonth(direction: 'prev' | 'next') {
    const dir = direction === 'prev' ? -1 : 1
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + dir, 1)
  }

  private handleChangeCalendarYear(direction: 'prev' | 'next') {
    const dir = direction === 'prev' ? -1 : 1
    this.date = new Date(this.date.getFullYear() + dir, this.date.getMonth(), 1)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'date-picker': DatePicker
  }
}
