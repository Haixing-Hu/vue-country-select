var assert = require("assert");
var Vue = require("vue");
var CountrySelect = require("../../src/vue-country-select.js");
var VueI18n = require("../../lib/vue-i18n-plugin/src/vue-i18n.js");
var Countries = require("../../src/countries.js");

function getVM(rootId, initResult) {
  return Vue.extend({
    template: "<div><vue-country-select v-ref:select :model.sync='result'></vue-country-select></div>",
    el: function() {
      var el = document.createElement("div");
      el.id = rootId;
      document.body.appendChild(el);
      return el;
    },
    components: {
      "vue-country-select": CountrySelect
    },
    data: function() {
      return {
        result: initResult
      };
    }
  });
}


describe("vue-country-select", function() {

  describe("static render", function() {
    describe("initial model is null", function() {
      var VM = getVM("static-render", null);
      var vm = new VM();
      it("options should be country list", function(done) {
        vm.$nextTick(function() {
          var root = $("#static-render");
          var select = root.find("select");
          var options = select.find("option");
          assert.equal(options.length, Countries.length);
          var n = options.length;
          for (var i = 0; i < n; ++i) {
            assert.equal(options[i].text, Countries[i].name);
            assert.equal(options[i].value, Countries[i].code);
          }
          done();
        });
      });
      it("selection should be none", function(done) {
        vm.$nextTick(function() {
          var root = $("#static-render");
          var select = root.find("select");
          assert.equal(select.val(), null);
          done();
        });
      });
    });
    describe("initial model is non-null", function() {
      var VM = getVM("static-render-init-non-null", "CN");
      var vm = new VM();
      it("selection should be CN", function(done) {
        vm.$nextTick(function() {
          var root = $("#static-render-init-non-null");
          var select = root.find("select");
          assert.equal(select.val(), "CN");
          done();
        });
      });
    });
  });

  describe("change the model", function() {
    var VM = getVM("change-model", "CN");
    var vm = new VM();
    it("set model to non-null", function(done) {
      vm.$nextTick(function() {
        var root = $("#change-model");
        var select = root.find("select");
        assert.equal(vm.result, "CN");
        assert.equal(select.val(), "CN");
        vm.result = "JP";
        vm.$nextTick(function() {
          assert.equal(select.val(), "JP");
          done();
        });
      });
    });
    it("set model to null", function(done) {
      vm.$nextTick(function() {
        var root = $("#change-model");
        var select = root.find("select");
        vm.result = null;
        vm.$nextTick(function() {
          assert.equal(select.val(), null);
          done();
        });
      });
    });
  });

  describe("change the selection", function() {
    var VM = getVM("change-selection", "CN");
    var vm = new VM();
    it("set selection to non-null", function(done) {
      vm.$nextTick(function() {
        var root = $("#change-selection");
        var select = root.find("select");
        assert.equal(vm.result, "CN");
        assert.equal(select.val(), "CN");
        select.val("JP").trigger("change");
        vm.$nextTick(function() {
          assert.equal(vm.result, "JP");
          done();
        });
      });
    });
    it("set selection to null", function(done) {
      vm.$nextTick(function() {
        var root = $("#change-selection");
        var select = root.find("select");
        select.val(null).trigger("change");
        vm.$nextTick(function() {
          assert.equal(vm.result, null);
          done();
        });
      });
    });
  });

  describe("i18n localization", function() {
    before(function() {
      Vue.use(VueI18n, {
        baseUrl: "/base/test/specs/i18n"
      });
    });
    it("test i18n localization", function(done) {
      var vm = new Vue({
        template: "<div><vue-country-select model='{{@result}}'></vue-country-select></div>",
        el: function() {
          var el = document.createElement("div");
          el.id = "test-i18n";
          document.body.appendChild(el);
          return el;
        },
        components: {
          "vue-country-select": CountrySelect
        },
        data: function() {
          return {
            result: null
          };
        },
        beforeCompile: function() {
          this.$setLanguage("zh-CN");
        }
      });
      vm.$nextTick(function() {
        var root = $("#test-i18n");
        var select = root.find("select");
        var options = select.find("option");
        assert.equal(options.length, Countries.length);
        assert.equal(options[0].value, "AF");
        assert.equal(options[0].text,  "阿富汗");
        assert.equal(options[1].value, "AX");
        assert.equal(options[1].text,  "奥兰群岛");
        assert.equal(options[2].value, "AL");
        assert.equal(options[2].text,  "阿尔巴尼亚");
        assert.equal(options[3].value, "DZ");
        assert.equal(options[3].text,  "阿尔及利亚");
        assert.equal(options[4].value, "AS");
        assert.equal(options[4].text,  "美属萨摩亚");
        assert.equal(options[5].value, "AD");
        assert.equal(options[5].text,  "安道尔");
        assert.equal(options[6].value, "AO");
        assert.equal(options[6].text,  "安哥拉");
        var n = options.length;
        for (var i = 8; i < n; ++i) {
          assert.equal(options[i].text, Countries[i].name);
          assert.equal(options[i].value, Countries[i].code);
        }
        done();
      });
    });
  });
});