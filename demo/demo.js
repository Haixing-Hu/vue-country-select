var Vue = require("vue");
var i18n = require("vue-i18n-plugin");
Vue.use(i18n);

var vm = new Vue({
  el: "#app",
  components: {
    "vue-country-select": require("../src/vue-country-select.js")
  },
  data: {
    language: "en-US",
    result: null
  },
  watch: {
    "language": function(val, oldVal) {
      this.$setLanguage(val);
    }
  }
});