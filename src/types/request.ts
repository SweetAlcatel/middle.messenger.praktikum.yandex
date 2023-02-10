import { FixMeLater } from "./index";

export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type RequestOptions = {
  timeout: number;
  method: Methods;
  data?: FixMeLater;
  headers?: FixMeLater;
};
