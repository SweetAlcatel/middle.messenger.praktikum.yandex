import { RequestOptions, Methods } from "../types/request";

function queryStringify(data: { [key: string]: any }) {
  if (typeof data !== "object") {
    throw new Error("data должна быть объектом");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

class HTTPTransport {
  get = (url: string, options: RequestOptions) => {
    return this.request(url, {
      ...options,
      method: Methods.GET,
      timeout: 5000,
    });
  };

  post = (url: string, options: RequestOptions) => {
    return this.request(url, {
      ...options,
      method: Methods.POST,
      timeout: 5000,
    });
  };

  put = (url: string, options: RequestOptions) => {
    return this.request(url, {
      ...options,
      method: Methods.PUT,
      timeout: 5000,
    });
  };

  delete = (url: string, options: RequestOptions) => {
    return this.request(url, {
      ...options,
      method: Methods.DELETE,
      timeout: 5000,
    });
  };

  request = (url: string, options: RequestOptions) => {
    const { headers, method, data, timeout } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("Нет метода");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === Methods.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export { HTTPTransport };
