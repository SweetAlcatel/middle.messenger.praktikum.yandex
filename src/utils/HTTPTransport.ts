import { queryString } from "./QueryString";
import { RecordString } from "../types/types";

enum Methods {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

interface IOption {
  method?: Methods;
  data?: unknown;
  headers?: RecordString;
}

export const API_URL = "https://ya-praktikum.tech/api/v2";

export class HTTPTransport {
  static API_URL = API_URL;
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get = (url: string, options: IOption) => {
    const newUrl = options.data
      ? url + queryString(options.data as RecordString)
      : url;

    return this.request(newUrl, { ...options });
  };

  public put = (url: string, options: IOption) => {
    return this.request(url, { ...options, method: Methods.PUT });
  };

  public post = (url: string, options: IOption) => {
    return this.request(url, { ...options, method: Methods.POST });
  };

  public delete = (url: string, options: IOption) => {
    return this.request(url, { ...options, method: Methods.DELETE });
  };

  request = (
    url: string,
    options: IOption = { method: Methods.GET }
  ): Promise<any> => {
    const { headers, data, method } = options;

    const isFormData = headers?.["Content-Type"] === "multipart/form-data";

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method || Methods.GET, `${this.endpoint}${url}`);
      if (!isFormData) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      if (headers) {
        Object.entries(headers).forEach((item) => {
          const [key, value] = item;
          if (!isFormData) {
            xhr.setRequestHeader(key, value);
          }
        });
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: "abort" });
      xhr.onerror = () => reject({ reason: "network error" });
      xhr.ontimeout = () => reject({ reason: "timeout" });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (method === Methods.GET || !data) {
        xhr.send();
      } else if (isFormData) {
        xhr.send(data as XMLHttpRequestBodyInit);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
