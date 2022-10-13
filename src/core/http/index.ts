import { net } from 'electron'

interface HttpRequestResponseObject {
  data: string;
  statusCode: number;
  headers: Record<string, string | string[]>;
  _redirectable: { redirectUrl: string, method: string, statusCode: number };
}

type OPTIONS = Electron.ClientRequestConstructorOptions;

let http: {
  get: (url: string, options: OPTIONS, parameter: any) => Promise<HttpRequestResponseObject>;
  post: (url: string, options: OPTIONS, parameter: any) => Promise<HttpRequestResponseObject>;
} = { } as any;

// Http get
http.get = (url, options, parameter = null) => {
  let json = options ? Object.assign({
    method: 'GET',
    port: 80,
    url,
  }, options) : url;

  return send(json, parameter)
}

// Http post
http.post = (url, options, parameter = null) => {
  let json = options ? Object.assign({
    method: 'POST',
    port: 443,
    url,
  }, options) : url;

  return send(json, parameter)
}

// Send the http request
async function send(json: string | OPTIONS, parameter: any): Promise<HttpRequestResponseObject> {
  return new Promise((resolve, reject) => {
    // Create request instance
    let request = net.request(json)

    // Write params to request body
    if (parameter) {
      request.write(parameter)
    }

    let result: any = {
      data: ''
    }

    // Add a listener with redirect
    request.on('redirect', (statusCode: number, method: string, redirectUrl: string) => {
      result._redirectable = {
        method,
        statusCode,
        redirectUrl
      }
    })

    // Add a listener with response
    request.on('response', (response) => {
      result.headers = response.headers;
      result.statusCode = response.statusCode;
      response.on('data', (chunk) => {
        result.data += chunk.toString()
      })

      response.on('end', () => {
        resolve(result);
      })
    })

    request.on('error', (err) => {
      reject(err.toString())
    })


    // Send the request
    request.end()
  })
}

export default http
