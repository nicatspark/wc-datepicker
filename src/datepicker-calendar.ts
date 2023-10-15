import { LitElement, html, PropertyValues, PropertyValueMap } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { styles } from './datepicker-calendar.css'

/**
 * A Datepicker-calendar.
 *
 * @fires selected-date-changed - Indicates when the count changes
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
    oldVal: string,
    newVal: string
  ) {
    if (name === 'selected-date' && oldVal !== newVal) {
      this.selectedDate = new Date(newVal)
    }
  }

  @state()
  numberOfDays = 0

  @state()
  numberOfDaysLastMonth = 0

  @property()
  selectedDate: Date | undefined = undefined

  @property({ type: Boolean })
  range = false

  @state()
  selectedDateRange: [Date | null, Date | null] = [null, null]

  @property({ type: Number })
  firstDayOfWeek = 0

  @property({ type: Date })
  date = new Date()

  @property({ reflect: true })
  locale = 'en-US'

  override willUpdate(changedProperties: PropertyValues<this>) {
    // console.log('changedProperties', changedProperties)
    // only need to check changed properties for an expensive computation.
    // if (changedProperties.has('selectedDateRange')) {
    //   console.log('dateRange updated!!!', this.selectedDateRange)
    // }
    if (changedProperties.has('date')) {
      // Check that this.date is a date object
      if (!(this.date instanceof Date)) {
        console.log('Error: Date is ', this.date)
        this.date = new Date()
      }
      // calculate month with days for the app.
      console.log('changedProperties', changedProperties)
      this.numberOfDays = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        0
      ).getDate()
      this.numberOfDaysLastMonth = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        0
      ).getDate()
    }
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
            @click="${() => {
              this.dispatchEvent(
                new CustomEvent('update-calendar-view', {
                  detail: { year: -1 },
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
          ${this.date.toLocaleString(this.locale, { month: 'long' })}
          ${this.date.getFullYear()}
        </h4>
        <div
          class="calendar-head__controls${this.range &&
          this.classList.contains('start')
            ? ' hide'
            : ''}"
        >
          <button
            @click="${() => {
              this.dispatchEvent(
                new CustomEvent('update-calendar-view', {
                  detail: { year: 1 },
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
      <!--p
        >Days in
        ${this.date.toLocaleString(this.locale, {
        month: 'long',
      })}:
        ${this.numberOfDays}<br />
        Previous month had: ${this.numberOfDaysLastMonth} <br />First of the
        month occurs on a:
        ${new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        1
      ).toLocaleString(this.locale, {
        weekday: 'long',
      })}
        = ${this.calendarMonthStartsOn()}
        <br />
        Selected date:
        <b>
          ${this.selectedDate
        ? this.selectedDate?.toLocaleString(this.locale, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : 'none'}</b
        >
      </p -->

      <!-- weekdays -->
      <ul class="weekdays grid">
        ${repeat(
          Array.from({ length: 7 }, (_, i) => i),
          (day) => day,
          (day) => {
            return html`<li
              >${new Intl.DateTimeFormat(this.locale, {
                weekday: 'short',
              }).format(new Date(2018, 0, day))}
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
                class="day${this.selectedDate?.getTime() ===
                new Date(
                  this.date.getFullYear(),
                  this.date.getMonth(),
                  day
                ).getTime()
                  ? ' selected'
                  : ''}${new Date(
                  this.date.getFullYear(),
                  this.date.getMonth(),
                  day
                ).getTime() === new Date().setHours(0, 0, 0, 0)
                  ? ' today'
                  : ''}"
                aria-label="Choose ${new Date(
                  this.date.getFullYear(),
                  this.date.getMonth(),
                  day
                ).toLocaleDateString(this.locale, {
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

  private handleSelectDay({
    year = this.date.getFullYear(),
    month = this.date.getMonth(),
    day,
  }: {
    day: number
    month?: number
    year?: number
  }) {
    // this.selectedDate = new Date(year, month, day)
    this.dispatchEvent(
      new CustomEvent('selected-date-changed', {
        detail: new Date(year, month, day),
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
              this.handleSelectDay({ month: this.date.getMonth() - 1, day })
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
            new Date(
              this.date.getFullYear(),
              this.date.getMonth(),
              this.numberOfDays + 1
            ).getDay(),
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
                month: this.date.getMonth() + 1,
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
    year = this.date.getFullYear(),
    month = this.date.getMonth(),
  } = {}) {
    return new Date(year, month, 1).getDay()
  }

  private getCalendarStartDay(date?: Date) {
    const aDate = date ?? this.date
    return new Date(aDate.getFullYear(), aDate.getMonth(), 1)
    /* .toLocaleString('default', {
      weekday: 'long',
    }) */
  }

  // private _onClick() {
  //   this.count++
  //   this.dispatchEvent(new CustomEvent('count-changed'))
  // }

  /**
   * Formats a greeting
   * @param name The name to say "Hello" to
   */
}

declare global {
  interface HTMLElementTagNameMap {
    'datepicker-calendar': DatepickerCalendar
  }
}
