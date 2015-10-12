/**
 * A bootstrap style selection (combobox) control used to select countries.
 *
 * @param model
 *    the model bind to the control, which must be a two way binding variable.
 * @param searchable
 *    the optional flag indicates whether to show the search box. Default
 *    value is true.
 * @param language
 *    the optional code of language used by the select2 plugin. Default value
 *    is "en".
 * @param theme
 *    the optional name of the theme of the select2. Default value is
 *    "bootstrap".
 * @author Haixing Hu
 */
module.exports = {
  replace: true,
  inherit: false,
  template: "<vue-select model='{{@ model}}' options='{{countries}}' theme='{{theme}}'" +
            "searchable='{{searchable}}' language='{{language}}'></vue-select>",
  components: {
    "vue-select": require("vue-select")
  },
  props: {
    model: {
      required: true,
      twoWay: true
    },
    searchable: {
      type: Boolean,
      required: false,
      default: true
    },
    language: {
      type: String,
      required: false,
      default: "en"
    },
    theme: {
      type: String,
      required: false,
      default: "bootstrap"
    }
  },
  beforeCompile: function() {
    var list = require("./countries.js");
    this.countries = [];
    for (var i = 0; i < list.length; ++i) {
      var code = list[i].code;
      var name = list[i].name;
      if (this.$i18n && this.$i18n.country && this.$i18n.country[code]) {
        name = this.$i18n.country[code];
      }
      this.countries.push({
        value: code,
        text: name
      });
    }
  }
};
