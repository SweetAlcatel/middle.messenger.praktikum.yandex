import { requstInstance } from "../utils/request";
import { Methods } from "../types/request";

class UserController {
  static host = "https://ya-praktikum.tech/api/v2";

  public static signUp(data: any) {
    return requstInstance.post(`${this.host}/auth/signup`, {
      timeout: 3000,
      method: Methods.POST,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static signIn(data: any) {
    return requstInstance.post(`${this.host}/auth/signin`, {
      timeout: 3000,
      method: Methods.POST,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static getUser() {
    return requstInstance.get(`${this.host}/auth/user`, {
      timeout: 3000,
      method: Methods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static logOut() {
    return requstInstance.post(`${this.host}/auth/logout`, {
      timeout: 3000,
      method: Methods.POST,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export { UserController };
