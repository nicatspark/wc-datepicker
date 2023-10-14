import { LitElement, PropertyValues } from 'lit';
/**
 * A Datepicker-calendar.
 *
 * @fires selected-date-changed - Indicates when the count changes
 * @slot - This element has a slot
 */
export declare class DatepickerCalendar extends LitElement {
    static styles: import("lit").CSSResult;
    numberOfDays: number;
    numberOfDaysLastMonth: number;
    selectedDate: Date | undefined;
    firstDayOfWeek: number;
    date: Date;
    locale: string;
    willUpdate(changedProperties: PropertyValues<this>): void;
    render(): import("lit-html").TemplateResult<1>;
    private handleSelectDay;
    private getCalendarPreMonthDays;
    private getCalendarRemaningDays;
    private calendarMonthStartsOn;
    private getCalendarStartDay;
}
declare global {
    interface HTMLElementTagNameMap {
        'datepicker-calendar': DatepickerCalendar;
    }
}
//# sourceMappingURL=datepicker-calendar.d.ts.map