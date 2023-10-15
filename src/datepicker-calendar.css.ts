import { css } from 'lit'

const styles = css`
  :host {
    display: block;
    box-sizing: inherit;
    width: 100%;
  }
  :host([hidden]) {
    display: none !important;
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
    margin-block: 1em 0.5em;
    font-weight: bold;
    color: var(--weekday-fg);
  }
  .calendar > li {
    outline: solid 1px var(--day-outline);
    background-color: #fff;

    & button {
      aspect-ratio: 1;
      background-color: transparent;
      border: 0;
      border-radius: 0;
      display: grid;
      place-items: center;
      font-size: 1.2em;
      cursor: pointer;
      width: 100%;
      &.today {
        background-color: var(--today);
        color: var(--today-fg);
      }
      &.selected {
        background-color: var(--selected-bg);
        color: var(--selected-fg);
      }
      &.prevmonth,
      &.nextmonth {
        color: var(--other-month-fg);
      }
      &:not(.selected):hover {
        background-color: var(--hover-bg);
      }
    }
  }

  .calendar-head {
    display: grid;
    grid-template-columns: min-content auto min-content;
    gap: 0em;
    padding: 0;
    margin: 0;
    font-size: 1.2em;
    & .calendar-head__controls {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & h4 {
      text-align: center;
      margin: 0;
      padding: 0;
    }
    & button {
      border: none;
      background-color: transparent;
      cursor: pointer;
      color: var(--button-control-fg);
      & > div {
        width: 1em;
        height: 1em;
      }
      &:hover {
        color: var(--button-control-fg-hover);
      }
    }
  }
`

export { styles }
