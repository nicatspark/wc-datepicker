var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
let DatePicker = class DatePicker extends LitElement {
    constructor() {
        super(...arguments);
        this.numberOfDays = 0;
        this.date = new Date();
        /**
         * The number of times the button has been clicked.
         */
        this.count = 0;
    }
    willUpdate(changedProperties) {
        // only need to check changed properties for an expensive computation.
        if (changedProperties.has('date')) {
            // calculate month with days for the app.
            console.log('changedProperties', changedProperties);
            this.numberOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        }
    }
    render() {
        return html `
      <div class="calendar-head">
        <div class="calendar-head__back">&lt;</div>

        <h4
          >${this.date.toLocaleString('en-us', {
            month: 'long',
        })}
          ${this.date.getFullYear()}</h4
        >
        <div class="calendar-head__fwd">&gt;</div>
      </div>
      <p
        >Days in
        ${this.date.toLocaleString('default', {
            month: 'long',
        })}:
        ${this.numberOfDays}</p
      >
      <p
        >First of the month occurs on a:
        ${new Date(this.date.getFullYear(), this.date.getMonth(), 1).toLocaleString('default', {
            weekday: 'long',
        })}
        = ${new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay()}
      </p>
      <ul class="weekdays grid">
        ${repeat(Array.from({ length: 7 }, (_, i) => i), (day) => day, (day) => {
            return html `<li
              >${new Intl.DateTimeFormat('en-US', {
                weekday: 'short',
            }).format(new Date(2018, 0, day))}
            </li>`;
        })}
      </ul>
      <ol class="calendar grid">
        ${repeat(Array.from({
            length: new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay(),
        }, (_, i) => i), (day) => day, () => {
            return html `<li class="day prevmonth"></li>`;
        })}
        ${repeat(Array.from({ length: this.numberOfDays }, (_, i) => i + 1), (day) => day, (day) => {
            return html `<li class="day">${day}</li>`;
        })}
        ${repeat(Array.from({
            length: 7 -
                new Date(this.date.getFullYear(), this.date.getMonth(), this.numberOfDays + 1).getDay(),
        }, (_, i) => i), (day) => day, (day) => {
            return html `<li class="day nextmonth">${day + 1}</li>`;
        })}
      </ol>

      <slot></slot>
    `;
    }
    // private _onClick() {
    //   this.count++
    //   this.dispatchEvent(new CustomEvent('count-changed'))
    // }
    /**
     * Formats a greeting
     * @param name The name to say "Hello" to
     */
    sayHello(name) {
        return `Hello, ${name}`;
    }
};
DatePicker.styles = css `
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
      }
    }
  `;
__decorate([
    state()
], DatePicker.prototype, "numberOfDays", void 0);
__decorate([
    property({ type: Object, reflect: true })
], DatePicker.prototype, "date", void 0);
__decorate([
    property({ type: Number })
], DatePicker.prototype, "count", void 0);
DatePicker = __decorate([
    customElement('date-picker')
], DatePicker);
export { DatePicker };
//# sourceMappingURL=date-picker.js.map