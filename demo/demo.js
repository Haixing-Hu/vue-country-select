var Vue = require("vue");

var vm = new Vue({
  el: "#app",
  components: {
    "vue-country-select": require("../src/vue-country-select.js")
  },
  data: {
    result: null
  }
});