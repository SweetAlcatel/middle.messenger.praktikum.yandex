import { FixMeLater } from "../types";
import { Methods } from "../types/request";
import { requstInstance } from "../utils/request";

class ChatsController {
  static host = "https://ya-praktikum.tech/api/v2";

  public static getChats() {
    return requstInstance.get(`${this.host}/chats`, {
      timeout: 3000,
      method: Methods.GET,
      data: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static createChat(data: any) {
    return requstInstance.post(`${this.host}/chats`, {
      timeout: 3000,
      method: Methods.POST,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static addUserInChat(data: FixMeLater) {
    return requstInstance.post(`${this.host}/chats/users`, {
      timeout: 3000,
      method: Methods.POST,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static deleteUserFromChat(data: FixMeLater) {
    return requstInstance.delete(`${this.host}/chats/users`, {
      timeout: 3000,
      method: Methods.DELETE,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export { ChatsController };
