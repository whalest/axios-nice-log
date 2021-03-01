import { AxiosInstance, AxiosRequestConfig } from 'axios'
import chalk from 'chalk'
import chalkPipe from 'chalk-pipe'
import { isObject, stringify, mergeDeep } from './utils'
import qs from 'qs'

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

const eachParams = (data: any) => {
  let params = Object.entries(data)
    .map(
      ([key, val]) =>
        `${key}${chalk.gray('=')}${isObject(val) ? stringify(val) : val}`
    )
    .join(chalk.yellow('&'))

  return params
}

export const paramsToObject = (props: URLSearchParams) => {
  const params: Record<
    string,
    ReturnType<URLSearchParams['get' | 'getAll']>
  > = {}

  for (const key of props.keys()) {
    if (key.endsWith('[]')) {
      params[key.replace('[]', '')] = props.getAll(key)
    } else {
      params[key] = props.get(key)
    }
  }

  return params
}

const parseUrlSearch = (data: any) => {
  if (!(data instanceof URLSearchParams)) return data

  let result: { [k: string]: any } = {}

  for (let [key, value] of data) {
    result[key] = isObject(value) ? stringify(value) : value
  }

  return result
}

const parseUrl = (str = '', base: any) => {
  const { origin, pathname, search } = new URL(str, base)

  return {
    url: `${origin}${pathname}`,
    query: search,
  }
}

const serialize = (config: AxiosRequestConfig) => {
  let { url, query } = parseUrl(config.url, config.baseURL)

  let data = config.params || config.data || {}

  data = mergeDeep(qs.parse(query), isObject(data) ? data : qs.parse(data))

  let params = eachParams(data)

  params = params ? `${chalk.yellow('?')}${params}` : ''

  return {
    params,
    time: new Date().toLocaleTimeString(),
    method: (config.method || 'get').toUpperCase(),
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
  const options = { ...DEFAULTS, ...userOptions }

  if (!axios) {
    return
  }

  const interceptor = axios.interceptors.request.use((config) => {
    options.logger(print(config, options))
    return config
  })

  return {
    eject: () => axios.interceptors.request.eject(interceptor),
  }
}
