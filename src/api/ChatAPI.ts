import {
  IArchiveChat,
  IChatUsers,
  IChatInfo,
  IChatsGet,
  IChatUser,
  IDeleteChat,
  IFile,
} from "./interfaces";
import { HTTPTransport } from "../utils/HTTPTransport";

export class ChatAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport("/chats");
  }

  getChats(data: IChatsGet): Promise<IChatInfo[]> {
    return this.http.get("", { data });
  }

  getArchiveChats(data: IChatsGet): Promise<IChatInfo[]> {
    return this.http.get("/archive", { data });
  }

  getChatFiles(id: number): Promise<IFile[]> {
    return this.http.get(`/${id}/files`, {});
  }

  createChat(title: string): Promise<void> {
    return this.http.post("", { data: { title } });
  }

  deleteChat(id: number): Promise<IDeleteChat> {
    return this.http.delete("", { data: { chatId: id } });
  }

  archiveChat(id: number): Promise<IArchiveChat> {
    return this.http.post("/archive", { data: { chatId: id } });
  }

  unArchiveChat(id: number): Promise<IArchiveChat> {
    return this.http.post("/unarchive", { data: { chatId: id } });
  }

  getChatUsers(id: number, data: IChatUser): Promise<IChatUsers[]> {
    return this.http.get(`/${id}/users`, { data });
  }

  getNewMessagesCount(id: number): Promise<{ unread_count: number }> {
    return this.http.get(`/new/${id}`, {});
  }

  uploadChatAvatar(id: FormData, data: FormData): Promise<IChatInfo> {
    return this.http.put("/avatar", {
      data: {
        ...data,
        chatId: id,
      },
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  addUsersToChat(data: { users: number[]; chatId: number }): Promise<void> {
    return this.http.put("/users", { data });
  }

  deleteUsersFromChat(data: { users: number[]; chatId: number }): Promise<void> {
    return this.http.delete("/users", { data });
  }

  read(id: string): Promise<IChatInfo> {
    return this.http.get(`/${id}/common`, {});
  }

  getChatToken(chatId: number): Promise<{ token: string }> {
    return this.http.post(`/token/${chatId}`, {});
  }
}

export default new ChatAPI();
