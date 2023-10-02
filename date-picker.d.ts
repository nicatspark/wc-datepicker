import { LitElement, PropertyValues } from 'lit';
/**
 * A Date-Picker.
 *
 * @fires selected-date-changed - Indicates when the count changes
 * @slot - This element has a slot
 */
export declare class DatePicker extends LitElement {
    static styles: import("lit").CSSResult;
    numberOfDays: number;
    numberOfDaysLastMonth: number;
    selectedDate: Date | undefined;
    date: Date;
    locale: string;
    willUpdate(changedProperties: PropertyValues<this>): void;
    render(): import("lit-html").TemplateResult<1>;
    private handleSelectDay;
    private getCalendarPreMonthDays;
    private getCalendarRemaningDays;
    private calendarMonthStartsOn;
    private handleChangeCalendarMonth;
    private handleChangeCalendarYear;
    private getCalendarStartDay;
}
declare global {
    interface HTMLElementTagNameMap {
        'date-picker': DatePicker;
    }
}
//# sourceMappingURL=date-picker.d.ts.map