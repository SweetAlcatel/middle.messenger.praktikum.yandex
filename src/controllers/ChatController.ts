import API, { ChatAPI } from "../api/ChatAPI";
import store from "../utils/Store";
import { NotificationTypes, showNotification } from "../utils/ShowNotification";
import { IChatsGet, IChatUser } from "../api/interfaces";

export class ChatsController {
  private readonly api: ChatAPI;

  constructor() {
    this.api = API;
  }

  async fetchChats(data: IChatsGet) {
    const chats = await this.api.getChats(data);

    store.set("searchChatText", data.title);
    store.set("activeChat", null);
    store.set("chats", chats);
  }

  async createChat(title: string) {
    try {
      await this.api.createChat(title);
      await this.fetchChats({});
      store.set("activeChat", null);
      showNotification("Чат создан");
    } catch (e) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async getChatUsers(id: number, data: IChatUser) {
    try {
      const usersInChat = await this.api.getChatUsers(id, data);

      store.set("messages", []);
      store.set("activeChat", id);
      store.set("createChat", "");
      store.set("usersInChat", usersInChat);
    } catch (e) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async removeChat(id: number) {
    try {
      await this.api.deleteChat(id);
      await this.fetchChats({});

      store.set("activeChat", null);
    } catch (e) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async addUsersToChat(data: { users: number[]; chatId: number }) {
    try {
      await this.api.addUsersToChat(data);

      showNotification("Пользователь добавлен в чат");
    } catch (e) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async getChatToken(idChat: number) {
    try {
      return await this.api.getChatToken(idChat);
    } catch (e) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }
}

export default new ChatsController();
