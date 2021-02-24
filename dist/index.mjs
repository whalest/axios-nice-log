var __assign = Object.assign;

// src/index.ts
import chalk2 from "chalk";
import chalkPipe from "chalk-pipe";
var defaults = {
  prefix: "axios",
  styles: {
    prefix: "green",
    time: "reset",
    method: "yellow",
    url: "cyan",
    params: "reset",
    separator: "yellow",
    delimiter: "gray"
  },
  template: "%prefix %time %method %url%params",
  templates: {
    prefix: "[%s]",
    time: "%s",
    method: "%s",
    url: "%s",
    params: "%s",
    separator: "?",
    delimiter: "="
  },
  logger: console.log
};
var setAxiosNiceLog = function (options) { return defaults = __assign(__assign({}, defaults), options); };
var NiceLog = /*@__PURE__*/(function () {
  function NiceLog(options) {
  if ( options === void 0 ) options = {};

    this.options = {};
    this.setOptions(options);
  }
  NiceLog.prototype.setOptions = function setOptions (options) {
    if ( options === void 0 ) options = {};

    this.options = Object.assign(this.options, options);
  };
  NiceLog.prototype.get = function get (config) {
    var _a;
    var params = config.params ? Object.entries(config.params).map(function (ref) {
      var key = ref[0];
      var val = ref[1];

      return ("" + key + (chalk2.gray("=")) + val);
    }).join(chalk2.yellow("&")) : "";
    var urlParams = new URLSearchParams(config.params);
    var time = new Date().toLocaleTimeString();
    var method = (_a = config.method) != null ? _a : "";
    var url = new URL(config.url, config.baseURL).href;
    method = method.toUpperCase();
    params = params ? ("" + (chalk2.yellow("?")) + params) : "";
    var result = this.paint({
      params: params,
      prefix: this.options.prefix,
      time: time,
      method: method,
      url: url
    });
    this.print(result);
    return config;
  };
  NiceLog.prototype.print = function print (value) {
    this.options.logger(value);
  };
  NiceLog.prototype.chalkTemplate = function chalkTemplate (str) {
    if ( str === void 0 ) str = "";

    var result = str;
    try {
      var data = Object.assign([], {raw: [result]});
      result = chalk2(data);
    } catch (e) {
      this.options.logger("err parsing", e);
    }
    return result;
  };
  NiceLog.prototype.paint = function paint (fields) {
    var this$1 = this;

    var result = this.options.template;
    Object.entries(fields).forEach(function (ref) {
      var key = ref[0];
      var value = ref[1];

      var style = this$1.options.styles[key] || "reset";
      var val = this$1.options.templates[key].replace("%s", value || "");
      result = result.replace(("%" + key), chalkPipe(style)(val));
    });
    result = result;
    return result;
  };

  return NiceLog;
}());
var axiosNiceLog = function (config, options) {
  if ( options === void 0 ) options = {};

  return new NiceLog(__assign(__assign({}, defaults), options)).get(config);
};
var src_default = axiosNiceLog;
export {
  NiceLog,
  axiosNiceLog,
  src_default as default,
  setAxiosNiceLog
};
