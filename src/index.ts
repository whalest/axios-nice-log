import { AxiosInstance, AxiosRequestConfig } from 'axios'
import chalk from 'chalk'
import chalkPipe from 'chalk-pipe'

const DEFAULTS = {
  prefix: 'axios',
  styles: {
    prefix: 'green',
    time: 'reset',
    method: 'yellow',
    url: 'cyan',
    params: 'reset',
    separator: 'yellow',
    delimiter: 'gray',
  },
  template: '%prefix %time %method %url%params',
  templates: {
    prefix: '[%s]',
    time: '%s',
    method: '%s',
    url: '%s',
    params: '%s',
    separator: '?',
    delimiter: '=',
  },
  logger: console.log,
}

const objToString = (obj: any) => {
  try {
    return JSON.stringify(obj)
  } catch (e) {
    return `${obj}`
  }
}

const serialize = (config: AxiosRequestConfig) => {
  let method = (config.method || 'get').toUpperCase()

  let params =
    method === 'GET'
      ? Object.entries(config.params || {})
          .map(([key, val]) => `${key}${chalk.gray('=')}${val}`)
          .join(chalk.yellow('&'))
      : ` ${objToString(config.data)}`

  // TODO: refactor
  let urlParams = new URLSearchParams(config.params)

  let time = new Date().toLocaleTimeString()

  let url = new URL(config.url || '', config.baseURL).href

  // TODO: paint params
  params = params ? `${chalk.yellow('?')}${params}` : ''

  return {
    params,
    time,
    method,
    url,
  }
}

const print = (config: AxiosRequestConfig, options: typeof DEFAULTS) => {
  const serialized = serialize(config)

  let result = options.template

  const data = {
    ...options.templates,
    ...serialized,
    prefix: options.prefix,
  }

  const keys = Object.keys(
    options.templates
  ) as (keyof typeof DEFAULTS['templates'])[]

  keys.forEach((key) => {
    const value = data[key]

    const style = options.styles[key] || 'reset'
    const val = options.templates[key].replace('%s', value || '')

    result = result.replace(`%${key}`, chalkPipe(style)(val))
  })

  return result
}

export const useAxiosNiceLog = (
  axios: AxiosInstance,
  userOptions: Partial<typeof DEFAULTS> = {}
) => {
  const options = { ...userOptions, ...DEFAULTS }

  if (!axios) {
    return
  }

  axios.interceptors.request.use((config) => {
    options.logger(print(config, options))
    return config
  })

  return {
    unMount: () => {},
  }
}
