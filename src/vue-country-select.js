/**
 * A bootstrap style selection (combobox) control used to select countries.
 *
 * @param model
 *    the model bind to the control, which must be a two way binding variable.
 * @param searchable
 *    the optional flag indicates whether to show the search box. Default
 *    value is true.
 * @param name
 *    the optional name of the selection control.
 * @param language
 *    the optional code of language used by the select2 plugin. If it is not set,
 *    and the [vue-i18n](https://github.com/Haixing-Hu/vue-i18n) plugin is used,
 *    the component will use the language code `$language` provided by the
 *    [vue-i18n](https://github.com/Haixing-Hu/vue-i18n) plugin; otherwise, the
 *    component will use the default value "en-US".
 * @param theme
 *    the optional name of the theme of the select2. Default value is
 *    "bootstrap".
 * @author Haixing Hu
 */
module.exports = {
  replace: true,
  inherit: false,
  template: "<vue-select :name='name' :model.sync='model' :options='countries' :theme='theme'" +
            ":searchable='searchable' :language='language'></vue-select>",
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
    name: {
      type: String,
      required: false,
      default: ""
    },
    language: {
      type: String,
      required: false,
      default: ""
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
