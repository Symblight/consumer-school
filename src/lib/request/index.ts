import axios, { AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios'

type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const getApi = (): string | undefined =>
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_API_URL

const API_URL = getApi() || process.env.REACT_APP_API_URL

interface RequestConfig<Data = any> {
  url: string
  headers?: { [key: string]: string }
  config?: AxiosRequestConfig
  unsetContentType?: boolean
  method: TMethod
  body?: Data
  cancelToken?: CancelToken
}

const logRequest = (requestConfig: RequestConfig) => {
  if (localStorage.getItem('consumer-api-debug')) {
    /* eslint-disable no-console */

    console.groupCollapsed(
      `🏓 API:%c %c${requestConfig.method}%c URL: ${requestConfig.url}`,
      '',
      'background: skyblue; color: black',
      ''
    )
    console.log('request:', requestConfig)
    console.groupEnd()
    /* eslint-enable no-console */
  }
}

function getApiUrl(path: string) {
  if (API_URL) {
    return new URL(API_URL, path).href
  }
  return new URL('https://', path).href
}

const contentTypeFromOptions = (options: RequestConfig) => {
  if (options && options.body && options.body instanceof FormData) {
    return 'multipart/form-data'
  }
  if (options && options.headers && options.headers['Content-Type']) {
    return options.headers['Content-Type']
  }

  return typeof options.body === 'object'
    ? 'application/json'
    : (options.headers && options.headers['Content-Type']) || ''
}

const createContentType = (
  options: RequestConfig
): Headers | string[][] | Record<string, string> | undefined => {
  const header = contentTypeFromOptions(options)

  return header ? { 'Content-Type': header } : {}
}

const createAuthorization = (
  token?: string | null
): Headers | string[][] | Record<string, string> | undefined =>
  token ? { Authorization: `bearer ${token}` } : {}

/**
 * @param method
 *
 * @description POST GET DELETE PUT
 *
 *
 * @param url
 *
 * @param body
 *
 *
 * @example
 * ```javascript
 * await request({ url: `/users`, method: 'GET' });
 * ```
 **/

export const request = <RequestData = unknown, ResponseData = unknown>(
  request: RequestConfig<RequestData>,
  token?: string
): Promise<ResponseData> => {
  const formattedUrl = getApiUrl(request.url)
  const headers: any = {
    ...createContentType(request),
    ...createAuthorization(token),
    ...request.headers,
    Accept: '*/*',
  }

  if (process.env.NODE_ENV === 'development') {
    logRequest({ headers, ...request })
  }

  const requestConfig: AxiosRequestConfig = {
    method: request.method,
    url: formattedUrl,
    headers,
    data: request.body,
    withCredentials: true,
    cancelToken: request.cancelToken,
    ...request.config,
  }

  const response = axios(requestConfig).then(
    (response: AxiosResponse<ResponseData>) => response.data
  )

  return response
}
