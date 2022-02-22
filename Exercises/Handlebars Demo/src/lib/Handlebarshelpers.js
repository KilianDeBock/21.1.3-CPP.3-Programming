/**
 * A module with some custom block helpers
 */

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
  button: function (options) {
    return `<button>${options.fn(this)}</button>`;
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
};
