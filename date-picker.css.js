import { css } from 'lit';
const styles = css `
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
    --max-width: 21em;
    position: relative;
    display: block;
    border: solid 1px gray;
    padding: var(--calendar-padding);
    max-width: var(--max-width);
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
export { styles };
//# sourceMappingURL=date-picker.css.js.map