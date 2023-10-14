var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './datepicker-calendar';
/**
 * A Date-Picker.
 *
 * @fires selected-date-changed - Indicates when the count changes
 * @slot - This element has a slot
 */
let DatePicker = class DatePicker extends LitElement {
    constructor() {
        super(...arguments);
        this.date = new Date();
        this.datePlusOneMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
        this.range = false;
        this.locale = 'en-US';
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('next-year', () => {
            this.handleChangeCalendarYear('next');
        });
        this.addEventListener('next-month', () => {
            this.handleChangeCalendarMonth('next');
        });
        this.addEventListener('prev-month', () => {
            this.handleChangeCalendarMonth('prev');
        });
        this.addEventListener('prev-year', () => {
            this.handleChangeCalendarYear('prev');
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('next-year', () => {
            this.handleChangeCalendarYear('next');
        });
        this.removeEventListener('next-month', () => {
            this.handleChangeCalendarMonth('next');
        });
        this.removeEventListener('prev-month', () => {
            this.handleChangeCalendarMonth('prev');
        });
        this.removeEventListener('prev-year', () => {
            this.handleChangeCalendarYear('prev');
        });
    }
    willUpdate(changedProperties) {
        if (changedProperties.has('date')) {
            this.datePlusOneMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
        }
    }
    render() {
        return html `
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
    `;
    }
    handleChangeCalendarMonth(direction) {
        const dir = direction === 'prev' ? -1 : 1;
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + dir, 1);
    }
    handleChangeCalendarYear(direction) {
        const dir = direction === 'prev' ? -1 : 1;
        this.date = new Date(this.date.getFullYear() + dir, this.date.getMonth(), 1);
    }
};
DatePicker.styles = css `
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
      position: relative;
      display: block;
      border: solid 1px gray;
      padding: var(--calendar-padding);
      max-width: 43em;
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
  `;
__decorate([
    property({ type: Object })
], DatePicker.prototype, "date", void 0);
__decorate([
    state()
], DatePicker.prototype, "datePlusOneMonth", void 0);
__decorate([
    property({ type: Boolean })
], DatePicker.prototype, "range", void 0);
__decorate([
    property({ reflect: true })
], DatePicker.prototype, "locale", void 0);
DatePicker = __decorate([
    customElement('date-picker')
], DatePicker);
export { DatePicker };
//# sourceMappingURL=date-picker.js.map