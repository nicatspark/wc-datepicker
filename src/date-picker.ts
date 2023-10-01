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
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 25em;
      font-size: 0.7rem;
      font-family: Helvetica, sans-serif;
      box-sizing: border-box;
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
        color: #999;
        &:empty {
          border: 1px solid #ddd;
          background-color: #efefef;
        }
      }
    .calendar > li {
        aspect-ratio: 1;
        outline: solid 1px #ccc;
        background-color: #fff;
        display: grid;
        place-items: center;
        font-size: 1.2em;
        cursor: pointer;
        &:empty {
          outline: 1px solid #ddd;
          background-color: #efefef;
        }
        &.prevmonth, &.nextmonth {
          color: #999;
        }
        &:hover {
          background-color: #def;
        }
      }
      .calendar-head {
        display: grid;
        grid-template-columns: min-content auto min-content;
        gap: 0em;
        padding: 0;
        margin: 0;
        font-size: 1.2em;
        & h4 {
          text-align: center;
          margin: 0;
          padding: 0;
        }
        & button {
          border: none;
          background-color: transparent;
          cursor: pointer;
          color: #333;
          &:hover {
            color: #000;
          }
        }
      }
    }
  `

  @state()
  numberOfDays = 0

  @state()
  numberOfDaysLastMonth = 0

  @property({ type: Object })
  date = new Date()

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
        <div class="calendar-head__back">
          <button @click="${this.handleChangeMonth('prev')}">&lt;</button>
        </div>
        <h4>
          ${this.date.toLocaleString('en-us', { month: 'long' })}
          ${this.date.getFullYear()}
        </h4>
        <div class="calendar-head__fwd">
          <button @click="${this.handleChangeMonth('next')}">&gt;</button>
        </div>
      </div>
      <p
        >Days in
        ${this.date.toLocaleString('default', {
          month: 'long',
        })}:
        ${this.numberOfDays}<br />
        Previous month had: ${this.numberOfDaysLastMonth} <br />First of the
        month occurs on a:
        ${new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          1
        ).toLocaleString('default', {
          weekday: 'long',
        })}
        = ${new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay()}
      </p>

      <!-- weekdays -->
      <ul class="weekdays grid">
        ${repeat(
          Array.from({ length: 7 }, (_, i) => i),
          (day) => day,
          (day) => {
            return html`<li
              >${new Intl.DateTimeFormat('en-US', {
                weekday: 'short',
              }).format(new Date(2018, 0, day))}
            </li>`
          }
        )}
      </ul>

      <!-- start of calendar -->
      <ol class="calendar grid">
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
            return html`<li class="day">${day}</li>`
          }
        )}
        ${repeat(
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
        )}
      </ol>

      <slot></slot>
    `
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
