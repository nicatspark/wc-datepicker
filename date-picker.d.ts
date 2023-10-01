import { LitElement, PropertyValues } from 'lit';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class DatePicker extends LitElement {
    static styles: import("lit").CSSResult;
    numberOfDays: number;
    numberOfDaysLastMonth: number;
    selectedDate: Date | undefined;
    date: Date;
    locale: string;
    /**
     * The number of times the button has been clicked.
     */
    count: number;
    willUpdate(changedProperties: PropertyValues<this>): void;
    render(): import("lit-html").TemplateResult<1>;
    private getRemaningDays;
    private monthStartsOn;
    private handleChangeMonth;
    private handleChangeYear;
    private getStartDay;
    /**
     * Formats a greeting
     * @param name The name to say "Hello" to
     */
    sayHello(name: string): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'date-picker': DatePicker;
    }
}
//# sourceMappingURL=date-picker.d.ts.map