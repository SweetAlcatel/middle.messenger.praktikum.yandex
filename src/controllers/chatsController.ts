import { BaseController } from "./baseController";
import { FixMeLater } from "../types/index";

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: FixMeLater;
    time: string;
    content: string;
  };
}

export class ChatsController extends BaseController {
  constructor() {
    super("/chats");
  }

  create(title: string) {
    return this.http.post("/", { title });
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete("/", { chatId: id });
  }

  read(): Promise<ChatInfo[]> {
    return this.http.get("/");
  }

  getUsers(id: number): Promise<Array<FixMeLater & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put("/users", { users, chatId: id });
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  update = undefined;
}

export default new ChatsController();
