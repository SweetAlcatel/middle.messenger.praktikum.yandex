export type RecordString = Record<string, string>;

export type Indexed<T = any> = {
  [key in string]: T;
};
