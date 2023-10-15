var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './datepicker-calendar';
import { styles } from './date-picker.css';
/**
 * A Date-Picker.
 *
 * @fires selected-date-changed - Indicates when the count changes
 * @slot - This element has a slot
 */
let DatePicker = class DatePicker extends LitElement {
    constructor() {
        super(...arguments);
        this.selectedDate = undefined;
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
        this.addEventListener('selected-date-changed', (e) => {
            this.selectedDate = e.detail;
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
        this.removeEventListener('selected-date-changed', (e) => {
            this.selectedDate = e.detail;
        });
    }
    willUpdate(changedProperties) {
        if (changedProperties.has('locale')) {
            this.date = new Date(this.date.toLocaleString(this.locale));
        }
        if (changedProperties.has('range')) {
            this.style.setProperty('--max-width', this.range ? '43em' : '21em');
        }
        if (changedProperties.has('date')) {
            this.datePlusOneMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
        }
    }
    render() {
        return html `
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
DatePicker.styles = styles;
__decorate([
    state()
], DatePicker.prototype, "selectedDate", void 0);
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