import { ISigninData, ISignupData, IUser } from "./interfaces";
import { HTTPTransport } from "../utils/HTTPTransport";

export class AuthAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport("/auth");
  }

  signin(data: ISigninData): Promise<void> {
    return this.http.post("/signin", { data });
  }

  signup(data: ISignupData): Promise<{ id: number }> {
    return this.http.post("/signup", { data });
  }

  read(): Promise<IUser> {
    return this.http.get("/user", {});
  }

  logout(): Promise<void> {
    return this.http.post("/logout", {});
  }
}

export default new AuthAPI();
