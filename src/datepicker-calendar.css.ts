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
    list-style: none;
    padding: 0;
    margin: 0;
  }
  h4 {
    margin: 0;
    padding: 0;
    font-size: 1.2em;
    white-space: nowrap;
    color: var(--title-fg);
  }
  .weekdays > li {
    display: grid;
    place-items: center;
    margin-block: 1em 0.5em;
    font-size: 1.2em;
    color: var(--weekday-fg);
  }
  .calendar > li {
    /* outline: solid 1px var(--day-outline); */
    background-color: #fff;
    border-radius: 0.2em;

    & button {
      aspect-ratio: 1.2 / 1;
      margin-block: 0.4em;
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
      &.in-range {
        background-color: var(--in-range-bg);
      }
      &.selected {
        background-color: var(--selected-bg);
        color: var(--selected-fg);
      }
      &.selected-start {
        border-radius: 5px 0 0 5px;
      }
      &.selected-end {
        border-radius: 0 5px 5px 0;
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
    position: relative;
    display: grid;
    grid-template-columns: min-content auto min-content;
    gap: 0em;
    padding: 0;
    margin: 0 0 1em 0;
    font-size: 1.2em;
    &:after {
      content: '';
      position: absolute;
      bottom: -0.8em;
      left: 0;
      right: 0;
      margin-inline: calc(var(--calendar-padding) * -1);
      display: block;
      height: 1px;
      background-color: var(--border-color);
      grid-column: 1 / -1;
    }
    & .calendar-head__controls {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & h4 {
      text-align: center;
      margin: 0;
      padding: 0;
      font-size: 1em;
      white-space: nowrap;
      color: var(--title-fg);
    }
    & button {
      border: none;
      background-color: transparent;
      cursor: pointer;
      padding: 0.2em;
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
  .hide {
    visibility: hidden;
    pointer-events: none;
  }
`

export { styles }
