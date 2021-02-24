// src/index.ts
import chalk from "chalk";
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
var setAxiosNiceLog = (options) => defaults = {...defaults, ...options};
var NiceLog = class {
  constructor(options = {}) {
    this.options = {};
    this.setOptions(options);
  }
  setOptions(options = {}) {
    this.options = Object.assign(this.options, options);
  }
  get(config) {
    var _a;
    let params = config.params ? Object.entries(config.params).map(([key, val]) => `${key}${chalk.gray("=")}${val}`).join(chalk.yellow("&")) : "";
    let urlParams = new URLSearchParams(config.params);
    let time = new Date().toLocaleTimeString();
    let method = (_a = config.method) != null ? _a : "";
    let url = new URL(config.url, config.baseURL).href;
    method = method.toUpperCase();
    params = params ? `${chalk.yellow("?")}${params}` : "";
    let result = this.paint({
      params,
      prefix: this.options.prefix,
      time,
      method,
      url
    });
    this.print(result);
    return config;
  }
  print(value) {
    this.options.logger(value);
  }
  chalkTemplate(str = "") {
    let result = str;
    try {
      let data = Object.assign([], {raw: [result]});
      result = chalk(data);
    } catch (e) {
      this.options.logger("err parsing", e);
    }
    return result;
  }
  paint(fields) {
    let result = this.options.template;
    Object.entries(fields).forEach(([key, value]) => {
      const style = this.options.styles[key] || "reset";
      const val = this.options.templates[key].replace("%s", value || "");
      result = result.replace(`%${key}`, chalkPipe(style)(val));
    });
    result = result;
    return result;
  }
};
var axiosNiceLog = (config, options = {}) => {
  return new NiceLog({...defaults, ...options}).get(config);
};
var src_default = axiosNiceLog;
export {
  NiceLog,
  axiosNiceLog,
  src_default as default,
  setAxiosNiceLog
};
