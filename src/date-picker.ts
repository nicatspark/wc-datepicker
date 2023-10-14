import { LitElement, html, css, PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './datepicker-calendar'

/**
 * A Date-Picker.
 *
 * @fires selected-date-changed - Indicates when the count changes
 * @slot - This element has a slot
 */
@customElement('date-picker')
export class DatePicker extends LitElement {
  static override styles = css`
    :host {
      --selected-bg: rgb(15, 88, 214);
      --selected-fg: #fff;
      --today: #eee;
      --today-fg: #000;
      --other-month-fg: #999;
      --hover-bg: #def;
      --day-outline: #ccc;
      --button-control-fg: #333;
      --button-control-fg-hover: #000;
      --weekday-fg: #999;
      --calendar-padding: 16px;
      --max-width: 21em;
      position: relative;
      display: block;
      border: solid 1px gray;
      padding: var(--calendar-padding);
      max-width: var(--max-width);
      font-size: 0.7rem;
      font-family: Helvetica, sans-serif;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
    .triangle {
      display: block;
      position: absolute;
      top: -10px;
      left: 50%;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-bottom-color: #fff;
      border-top: 0;
      margin-left: -10px;
    }
    :host([hidden]) {
      display: none !important;
    }
    .calendar-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: var(--calendar-padding);
    }
  `

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
  }

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
          .date="${this.date}"
          locale="${this.locale}"
          ?range="${this.range}"
        ></datepicker-calendar>
        <datepicker-calendar
          ?hidden="${!this.range}"
          .date="${this.datePlusOneMonth}"
          locale="${this.locale}"
          range="true"
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
