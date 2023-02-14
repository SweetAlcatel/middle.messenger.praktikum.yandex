import { ChatsApi } from "../api/chatsApi";
import store from "../utils/store";
import { MessageController } from "../controllers/messageController";

class ChatsController {
  private readonly api: ChatsApi;

  constructor() {
    this.api = new ChatsApi();
  }

  async create(title: string) {
    await this.api.create(title);

    this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessageController.connect(chat.id, token);
    });

    store.set("chats", chats);
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set("selectedChat", id);
  }
}

export { ChatsController };
