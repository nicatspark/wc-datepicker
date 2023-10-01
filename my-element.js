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
let MyElement = class MyElement extends LitElement {
    constructor() {
        super(...arguments);
        this.numberOfDays = 0;
        this.date = new Date();
        this.items = [
            { id: 1, name: 'one' },
            { id: 2, name: 'two' },
            { id: 3, name: 'three' },
        ];
        this.name = 'World';
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
      <h1>${this.sayHello(this.name)}!</h1>
      <ol>
        ${repeat(this.items, (item) => item.id, (item, index) => {
            return html `<li>${index}: ${item.name}</li>`;
        })}
      </ol>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
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
      <ol class="calendar">
        ${repeat(Array.from({
            length: new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay(),
        }, (_, i) => i), (day) => day, () => {
            return html `<li class="day"></li>`;
        })}
        ${repeat(Array.from({ length: this.numberOfDays }, (_, i) => i + 1), (day) => day, (day) => {
            return html `<li class="day">${day}</li>`;
        })}
        ${repeat(Array.from({
            length: 7 -
                new Date(this.date.getFullYear(), this.date.getMonth(), this.numberOfDays).getDay(),
        }, (_, i) => i), (day) => day, () => {
            return html `<li class="day"></li>`;
        })}
      </ol>

      <slot></slot>
    `;
    }
    _onClick() {
        this.count++;
        this.dispatchEvent(new CustomEvent('count-changed'));
    }
    /**
     * Formats a greeting
     * @param name The name to say "Hello" to
     */
    sayHello(name) {
        return `Hello, ${name}`;
    }
};
MyElement.styles = css `
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
    .calendar {
      display: grid;
      font-family: helvetica, sans-serif;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      list-style: none;
      padding: 0;
      margin: 0;
      & > li {
        aspect-ratio: 1;
        border: solid 1px gray;
        padding: 1rem;
        display: grid;
        place-items: center;
      }
    }
  `;
__decorate([
    state()
], MyElement.prototype, "numberOfDays", void 0);
__decorate([
    property({ type: Object })
], MyElement.prototype, "date", void 0);
__decorate([
    property({ type: Array })
], MyElement.prototype, "items", void 0);
__decorate([
    property()
], MyElement.prototype, "name", void 0);
__decorate([
    property({ type: Number })
], MyElement.prototype, "count", void 0);
MyElement = __decorate([
    customElement('date-picker')
], MyElement);
export { MyElement };
//# sourceMappingURL=my-element.js.map