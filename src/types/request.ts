export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
type FixMeLater = any;

export type RequestOptions = {
  timeout: number;
  method: Methods;
  data: FixMeLater;
  headers: FixMeLater;
};
