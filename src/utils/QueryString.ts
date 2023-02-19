import { RecordString } from "../types/types";

export function queryString(data: RecordString): string {
  return Object.keys(data)
    .reduce((prev, cur) => `${prev}${cur}=${data[cur]}&`, "?")
    .slice(0, -1);
}
