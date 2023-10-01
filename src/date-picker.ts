import { LitElement, html, css, PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
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
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 25em;
      font-size: 0.7rem;
      font-family: Helvetica, sans-serif;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0em;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .weekdays > li {
        display: grid;
        place-items: center;
        margin-block-end: 0.5em;
        font-weight: bold;
        color: var(--weekday-fg);
      }
    .calendar > li {
        aspect-ratio: 1;
        outline: solid 1px var(--day-outline);
        background-color: #fff;
        display: grid;
        place-items: center;
        font-size: 1.2em;
        cursor: pointer;
        &.today {
          background-color: var(--today);
          color: var(--today-fg);
        }
        &.selected {
          background-color: var(--selected-bg);
          color: var(--selected-fg);
        }
        &.prevmonth, &.nextmonth {
          color: var(--other-month-fg);
        }
        &:not(.selected):hover {
          background-color: var(--hover-bg);
        }
      }
      .calendar-head {
        display: grid;
        grid-template-columns: min-content auto min-content;
        gap: 0em;
        padding: 0;
        margin: 0;
        font-size: 1.2em;
        & .calendar-head__controls {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        & h4 {
          text-align: center;
          margin: 0;
          padding: 0;
        }
        & button {
          border: none;
          background-color: transparent;
          cursor: pointer;
          color: var(--button-control-fg);
          & > div {
            width: 1em;
            height: 1em;
          }
          &:hover {
            color: var(--button-control-fg-hover);
          }
        }
      }
    }
  `

  @state()
  numberOfDays = 0

  @state()
  numberOfDaysLastMonth = 0

  @state()
  selectedDate: Date | undefined = undefined

  @property({ type: Object })
  date = new Date()

  @property({ reflect: true })
  locale = 'en-US'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  override willUpdate(changedProperties: PropertyValues<this>) {
    // only need to check changed properties for an expensive computation.
    if (changedProperties.has('date')) {
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
        <div class="calendar-head__controls">
          <button @click="${this.handleChangeMonth('prev')}">
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
          <button @click="${this.handleChangeYear('prev')}">
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
        <div class="calendar-head__controls">
          <button @click="${this.handleChangeYear('next')}">
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
          <button @click="${this.handleChangeMonth('next')}">
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
      <p
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
        = ${this.monthStartsOn()}
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
      </p>

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
        ${repeat(
          Array.from(
            {
              length: this.getStartDay().getDay(),
            },
            (_, i) => {
              return (
                this.numberOfDaysLastMonth - this.getStartDay().getDay() + 1 + i
              )
            }
          ),
          (day) => day,
          (day) => {
            return html`<li class="day prevmonth">${day}</li>`
          }
        )}
        <!-- current days -->
        ${repeat(
          Array.from({ length: this.numberOfDays }, (_, i) => i + 1),
          (day) => day,
          (day) => {
            return html`<li
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
              @click="${() =>
                (this.selectedDate = new Date(
                  this.date.getFullYear(),
                  this.date.getMonth(),
                  day
                ))}"
              >${day}</li
            >`
          }
        )}
        <!-- next month -->
        ${this.getRemaningDays()}
      </ol>
      <slot></slot>
    `
  }

  private getRemaningDays() {
    if ((this.numberOfDays + this.monthStartsOn()) % 7 === 0) {
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
        return html`<li class="day nextmonth">${day + 1}</li>`
      }
    )
  }

  private monthStartsOn({
    year = this.date.getFullYear(),
    month = this.date.getMonth(),
  } = {}) {
    return new Date(year, month, 1).getDay()
  }

  private handleChangeMonth(direction: 'prev' | 'next') {
    return () => {
      const dir = direction === 'prev' ? -1 : 1
      this.date = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + dir,
        1
      )
    }
  }

  private handleChangeYear(direction: 'prev' | 'next') {
    return () => {
      const dir = direction === 'prev' ? -1 : 1
      this.date = new Date(
        this.date.getFullYear() + dir,
        this.date.getMonth(),
        1
      )
    }
  }

  private getStartDay(date?: Date) {
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
  sayHello(name: string): string {
    return `Hello, ${name}`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'date-picker': DatePicker
  }
}
