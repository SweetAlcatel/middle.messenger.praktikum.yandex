import { IFileData } from "./interfaces";
import { HTTPTransport } from "../utils/HTTPTransport";

export const RESOURCES_PATH = "resources";

export class ResourcesAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport(`/${RESOURCES_PATH}`);
  }

  read(path: string): Promise<IFileData> {
    return this.http.get(`/${path}`, {});
  }
}

export default new ResourcesAPI();
