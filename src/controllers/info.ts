import { requstInstance } from "../utils/request";
import { Methods } from "../types/request";
import { FixMeLater } from "../types";

class InfoController {
  static host = "https://ya-praktikum.tech/api/v2";

  public static changeDataUser(data: FixMeLater) {
    return requstInstance.put(`${this.host}/user/profile`, {
      timeout: 3000,
      method: Methods.PUT,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static changePassword(data: FixMeLater) {
    return requstInstance.put(`${this.host}/user/password`, {
      timeout: 3000,
      method: Methods.PUT,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static changeAvatar(data: any) {
    return requstInstance.put(`${this.host}/user/profile/avatar`, {
      timeout: 3000,
      method: Methods.PUT,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export { InfoController };
