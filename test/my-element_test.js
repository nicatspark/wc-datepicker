/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { DatePicker } from '../date-picker.js';
import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
suite('date-picker', () => {
    test('is defined', () => {
        const el = document.createElement('date-picker');
        assert.instanceOf(el, DatePicker);
    });
    test('renders with default values', async () => {
        const el = await fixture(html `<date-picker></date-picker>`);
        assert.shadowDom.equal(el, `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `);
    });
    test('renders with a set name', async () => {
        const el = await fixture(html `<date-picker name="Test"></date-picker>`);
        assert.shadowDom.equal(el, `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `);
    });
    test('handles a click', async () => {
        const el = (await fixture(html `<date-picker></date-picker>`));
        const button = el.shadowRoot.querySelector('button');
        button.click();
        await el.updateComplete;
        assert.shadowDom.equal(el, `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `);
    });
    test('styling applied', async () => {
        const el = (await fixture(html `<date-picker></date-picker>`));
        await el.updateComplete;
        assert.equal(getComputedStyle(el).paddingTop, '16px');
    });
});
//# sourceMappingURL=my-element_test.js.map