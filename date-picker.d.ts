import { LitElement, PropertyValues } from 'lit';
import './datepicker-calendar';
/**
 * A Date-Picker.
 *
 * @fires selected-date-changed - Indicates when the count changes
 * @slot - This element has a slot
 */
export declare class DatePicker extends LitElement {
    static styles: import("lit").CSSResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    selectedDate: Date | undefined;
    date: Date;
    datePlusOneMonth: Date;
    range: boolean;
    locale: string;
    willUpdate(changedProperties: PropertyValues<this>): void;
    render(): import("lit-html").TemplateResult<1>;
    private handleChangeCalendarMonth;
    private handleChangeCalendarYear;
}
declare global {
    interface HTMLElementTagNameMap {
        'date-picker': DatePicker;
    }
}
//# sourceMappingURL=date-picker.d.ts.map