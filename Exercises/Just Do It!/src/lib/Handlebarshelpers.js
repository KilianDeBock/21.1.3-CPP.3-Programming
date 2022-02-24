/**
 * A module with some custom block helpers
 */

import { capitalize } from "./utils.js";

export default {
  hackerBold: function (context, options) {
    const hackyStuff = {
      ...options.data.person,
      firstname: "Hacker",
      lastname: options.data.person.firstname,
    };

    return `<strong>${context} ${options.fn(hackyStuff)}</strong>`;
  },
  bold: function (options) {
    return `<strong>${options.fn(this)}</strong>`;
  },
  italic: function (options) {
    return `<em>${options.fn(this)}</em>`;
  },
  link: function (href, options) {
    return `<a href="${href}">${options.fn(this)}</a>`;
  },
  iff: function (check, options) {
    if (check) return options.fn(this);
    else return options.inverse(this);
  },
  eache: function (context, options) {
    var ret = "";

    for (var i = 0, j = context.length; i < j; i++) {
      ret = ret + options.fn(context[i]);
    }

    return ret;
  },
  button: function (type, use, options) {
    const validUse = ["first", "second", "third"];
    const validTypes = ["submit", "button", "reset"];

    // Validate incoming parameters
    if (validTypes.includes(type) && validUse.includes(use)) {
      return `
        <button class="${use}" type="${type}">
          ${options.fn(this)}
        </button>`;
    }
    return `
        <button class="primary" type="button">
          ${options.fn(this)}
        </button>`;
  },
  actionButton: function (type, options) {
    const validTypes = ["complete", "edit", "delete"];
    const renderedText = options.fn(this) || capitalize(type);

    // Validate incoming parameters
    if (validTypes.includes(type)) {
      return `<button data-action="${type}" class="actionItem ${type}Item">${renderedText}</button>`;
    }
    return `
        <button class="primary" type="button">
          ${options.fn(this)}
        </button>`;
  },
};
