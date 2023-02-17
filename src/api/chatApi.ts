import BaseAPI from "./baseApi";
import { User } from "./authApi";

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User;
    time: string;
    content: string;
  };
}

export interface NewChatInfo {
  id: number;
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  read(): Promise<ChatInfo[]> {
    return this.http.get("/");
  }

  create(title: string): Promise<NewChatInfo> {
    return this.http.post("/", { title: title });
  }

  delete(id: string): Promise<unknown> {
    return this.http.delete("/", { chatId: id });
  }

  getUsers(id: number): Promise<Array<User & { role: string }>> {
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

export default new ChatsAPI();
