import { LitElement, html, PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { styles } from './datepicker-calendar.css'

/**
 * A Datepicker-calendar.
 *
 * @fires selected-date-changed - Indicates when a date i selected
 * @fires selected-date-range-changed - Indicates when the date range updated
 * @slot - This element has a slot
 */
@customElement('datepicker-calendar')
export class DatepickerCalendar extends LitElement {
  static override styles = styles

  static override get observedAttributes() {
    return ['selected-date']
  }

  override attributeChangedCallback(
    name: string,
    oldVal: unknown,
    newVal: unknown
  ) {
    if (name === 'selected-date' && oldVal !== newVal) {
      this.selectedDate = new Date(newVal as string)
    }
  }

  @state()
  numberOfDays = 0

  @state()
  numberOfDaysLastMonth = 0

  @property({ type: Date })
  selectedDate: Date | undefined = undefined

  @property({ type: Boolean })
  range = false

  @property({ type: String })
  eventId = ''

  @property({ type: Object })
  selectedDateRange: { start: Date | null; end: Date | null } = {
    start: null,
    end: null,
  }

  @property({ type: Number })
  firstDayOfWeek = 0

  @property({ type: Date })
  date?: Date

  @property({ reflect: true })
  locale = 'en-US'

  override willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('date') && this.date) {
      this.numberOfDays = this._createDate({
        month: this.date.getMonth() + 1,
        day: 0,
      }).getDate()
      this.numberOfDaysLastMonth = this._createDate({ day: 0 }).getDate()
    }
  }

  private _createDate({
    year,
    month,
    day = 1,
  }: {
    year?: number
    month?: number
    day?: number
  }) {
    if (!this.date) return new Date()
    return new Date(
      year || this.date.getFullYear(),
      month || this.date.getMonth(),
      day
    )
  }

  override render() {
    return html`
      <div class="calendar-head">
        <div
          class="calendar-head__controls${this.range &&
          this.classList.contains('end')
            ? ' hide'
            : ''}"
        >
          <button
            aria-label="Previous month"
            title="Previous month"
            @click="${() => {
              this.dispatchEvent(
                new CustomEvent('update-calendar-view', {
                  detail: { month: -1 },
                  bubbles: true,
                  composed: true,
                })
              )
            }}"
          >
            <div aria-hidden="true" data-comp="icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                focusable="false"
                height="100%"
                width="100%"
              >
                <path
                  d="M12.69 14.161 8.564 9.995l4.124-4.167a1.077 1.077 0 0 0 0-1.514 1.051 1.051 0 0 0-1.499 0L6.31 9.243a1.077 1.077 0 0 0 0 1.514l4.88 4.929a1.051 1.051 0 0 0 1.5 0 1.1 1.1 0 0 0 0-1.525Z"
                ></path></svg
            ></div>
          </button>
          <button
            aria-label="Previous year"
            title="Previous year"
            @click="${() => {
              this.dispatchEvent(
                new CustomEvent('update-calendar-view', {
                  detail: { month: -12 },
                  bubbles: true,
                  composed: true,
                })
              )
            }}"
          >
            <div aria-hidden="true" data-comp="icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                focusable="false"
                height="100%"
                width="100%"
              >
                <path
                  d="M9.487 4.788a.97.97 0 0 1 0 1.398l-4 3.819 4 3.82a.95.95 0 0 1 0 1.387 1.061 1.061 0 0 1-1.453 0l-4.732-4.518a.95.95 0 0 1 0-1.388l4.732-4.518a1.061 1.061 0 0 1 1.453 0Zm7.211 0a.97.97 0 0 1 0 1.398l-4 3.819 4 3.82a.95.95 0 0 1 0 1.387 1.061 1.061 0 0 1-1.453 0l-4.732-4.518a.95.95 0 0 1 0-1.388l4.732-4.518a1.061 1.061 0 0 1 1.453 0Z"
                ></path></svg
            ></div>
          </button>
        </div>
        <h4>
          ${this.date?.toLocaleString(this.locale, { month: 'short' })}
          ${this.date?.getFullYear()}
        </h4>
        <div
          class="calendar-head__controls${this.range &&
          this.classList.contains('start')
            ? ' hide'
            : ''}"
        >
          <button
            aria-label="Next year"
            title="Next year"
            @click="${() => {
              this.dispatchEvent(
                new CustomEvent('update-calendar-view', {
                  detail: { month: 12 },
                  bubbles: true,
                  composed: true,
                })
              )
            }}"
          >
            <div aria-hidden="true" data-comp="icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                focusable="false"
                height="100%"
                width="100%"
              >
                <path
                  d="m11.966 4.788 4.732 4.518a.95.95 0 0 1 0 1.388l-4.732 4.518a1.061 1.061 0 0 1-1.453 0 .97.97 0 0 1 0-1.398l4-3.819-4-3.82a.95.95 0 0 1 0-1.387 1.061 1.061 0 0 1 1.453 0Zm-7.21 0 4.731 4.518a.95.95 0 0 1 0 1.388l-4.732 4.518a1.061 1.061 0 0 1-1.453 0 .97.97 0 0 1 0-1.398l4-3.819-4-3.82a.95.95 0 0 1 0-1.387 1.061 1.061 0 0 1 1.453 0Z"
                ></path></svg
            ></div>
          </button>
          <button
            aria-label="Next month"
            title="Next month"
            @click="${() => {
              this.dispatchEvent(
                new CustomEvent('update-calendar-view', {
                  detail: { month: 1 },
                  bubbles: true,
                  composed: true,
                })
              )
            }}"
          >
            <div aria-hidden="true" data-comp="icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                focusable="false"
                height="100%"
                width="100%"
              >
                <path
                  d="m7.31 5.839 4.125 4.166-4.124 4.167a1.077 1.077 0 0 0 0 1.514 1.051 1.051 0 0 0 1.499 0l4.88-4.929a1.077 1.077 0 0 0 0-1.514L8.81 4.314a1.051 1.051 0 0 0-1.5 0 1.1 1.1 0 0 0 0 1.525Z"
                ></path></svg
            ></div>
          </button>
        </div>
      </div>

      <!-- weekdays -->
      <ul class="weekdays grid">
        ${repeat(
          Array.from({ length: 7 }, (_, i) => i),
          (day) => day,
          (day) => {
            return html`<li
              >${new Intl.DateTimeFormat(this.locale, {
                weekday: 'short',
              })
                .format(new Date(2018, 0, day))
                .slice(0, 2)}
            </li>`
          }
        )}
      </ul>

      <!-- start of calendar -->
      <ol class="calendar grid">
        <!-- previous month -->
        ${this.getCalendarPreMonthDays()}
        <!-- current days -->
        ${repeat(
          Array.from({ length: this.numberOfDays }, (_, i) => i + 1),
          (day) => day,
          (day) => {
            return html`<li
              ><button
                class="day ${this.returnDayState(day)}"
                aria-label="Choose ${this._createDate({
                  day,
                }).toLocaleDateString(this.locale, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}"
                @click="${() => this.handleSelectDay({ day })}"
                >${day}</button
              ></li
            >`
          }
        )}
        <!-- next month -->
        ${this.getCalendarRemaningDays()}
      </ol>
      <slot></slot>
      <div class="triangle"></div>
    `
  }

  private returnDayState(day: number) {
    const classList = []
    const currentDay = this._createDate({ day }).getTime()

    // is in range
    if (
      this.selectedDateRange.start &&
      this.selectedDateRange.end &&
      currentDay > this.selectedDateRange.start.getTime() &&
      currentDay < this.selectedDateRange.end.getTime()
    )
      classList.push('in-range')
    // is range selected
    if (this.selectedDateRange.start) {
      if (this.selectedDateRange.start.getTime() === currentDay)
        classList.push('selected selected-start')
      if (this.selectedDateRange.end?.getTime() === currentDay)
        classList.push('selected selected-end')
    }
    // is single date selected
    if (!this.range && this.selectedDate?.getTime() === currentDay)
      classList.push('selected')

    // is today
    if (this._createDate({ day }).getTime() === new Date().setHours(0, 0, 0, 0))
      classList.push('today')

    return classList.join(' ')
  }

  private handleSelectDay({
    year = this.date?.getFullYear() || 1,
    month = this.date?.getMonth() || 1,
    day,
  }: {
    day: number
    month?: number
    year?: number
  }) {
    // this.selectedDate = new Date(year, month, day)
    this.dispatchEvent(
      new CustomEvent('selected-date-changed', {
        detail: {
          date: new Date(year, month, day),
          id: this.eventId,
        },
        composed: true,
      })
    )
  }

  private getCalendarPreMonthDays() {
    return repeat(
      Array.from(
        {
          length: this.getCalendarStartDay().getDay(),
        },
        (_, i) => {
          return (
            this.numberOfDaysLastMonth -
            this.getCalendarStartDay().getDay() +
            1 +
            i
          )
        }
      ),
      (day) => day,
      (day) => {
        return html`<li class="day "
          ><button
            class="prevmonth"
            @click="${() => {
              this.handleSelectDay({
                month: (this.date?.getMonth() || 1) - 1,
                day,
              })
              this.dispatchEvent(
                new CustomEvent('update-calendar-view', {
                  detail: { month: -1 },
                  bubbles: true,
                  composed: true,
                })
              )
            }}"
            >${day}</button
          ></li
        >`
      }
    )
  }

  private getCalendarRemaningDays() {
    if ((this.numberOfDays + this.calendarMonthStartsOn()) % 7 === 0) {
      return ''
    }
    return repeat(
      Array.from(
        {
          length:
            7 -
            this._createDate({
              year: this.date?.getFullYear(),
              month: this.date?.getMonth(),
              day: this.numberOfDays + 1,
            }).getDay(),
        },
        (_, i) => i
      ),
      (day) => day,
      (day) => {
        return html`<li class="day"
          ><button
            class="nextmonth"
            @click="${() => {
              this.handleSelectDay({
                month: this.date?.getMonth() || 0 + 1,
                day: day + 1,
              })
              this.dispatchEvent(
                new CustomEvent('update-calendar-view', {
                  detail: { month: 1 },
                  bubbles: true,
                  composed: true,
                })
              )
            }}"
            >${day + 1}</button
          ></li
        >`
      }
    )
  }

  private calendarMonthStartsOn({
    year = this.date?.getFullYear(),
    month = this.date?.getMonth(),
  } = {}) {
    return this._createDate({ year, month, day: 1 }).getDay()
  }

  private getCalendarStartDay(date?: Date) {
    const aDate = date ?? this.date
    return this._createDate({
      year: aDate?.getFullYear(),
      month: aDate?.getMonth(),
      day: 1,
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'datepicker-calendar': DatepickerCalendar
  }
}
