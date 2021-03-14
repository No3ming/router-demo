import qs from 'qs'
import path from 'path'

export function resolve (dir) {
  return path.join(__dirname, dir)
}

const file = ''
export function getFile () {
  if (file) {
    return file
  } else {
    return '/logo.png'
  }
}
export const builder = (data, message, code = 0, headers = {}) => {
  const responseBody = {
    message: '',
    code: 0,
    _headers: { 'content-type': 'application/json' }
  }
  responseBody.data = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    // responseBody._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = { ...headers, 'content-type': headers['content-type'] || 'application/json' }
  }
  console.log(responseBody)
  return responseBody
}

export const getQueryParameters = options => {
  console.log(options)
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return qs.parse(search)
}
export const getBody = options => {
  console.log(options)
  return options.body && JSON.parse(options.body)
}
