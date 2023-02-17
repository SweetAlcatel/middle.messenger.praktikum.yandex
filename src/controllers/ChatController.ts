import API from "../api/chatApi";
import { ChatsAPI } from "../api/chatApi";
import store from "../utils/store";
import MessagesController from "./messagesController";

export class ChatController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async getChats() {
    try {
      const chats = await this.api.read();

      chats.map(async (chat) => {
        const token = await this.getToken(chat.id);

        await MessagesController.connect(chat.id, token);
      });

      chats.forEach((chat) => {
        if (chat.last_message) {
          chat.last_message.time = chat.last_message.time
            .split("T")[1]
            .slice(0, 5);
        }
      });

      store.set("chats", chats);
    } catch (e: any) {
      console.error(e);
    }
  }

  async createChat(nameChat: string, idUser: number) {
    try {
      const response = await this.api.create(nameChat);
      await this.getChats();

      if (response.id) this.addUserToChat(response.id, idUser);
    } catch (e: any) {
      console.error(e);
    }
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  async delete(id: string) {
    await this.api.delete(id);

    this.getChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set("selectedChat", id);
  }
}

export default new ChatController();
