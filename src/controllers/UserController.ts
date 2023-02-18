import API, {
  IChangePassword,
  IUserProfileData,
  UserAPI,
} from "../api/UserAPI";
import store from "../utils/Store";
import { NotificationTypes, showNotification } from "../utils/ShowNotification";

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async updateProfile(data: IUserProfileData) {
    try {
      const updatedData = await this.api.updateProfile(data);

      store.set("user", updatedData);
      showNotification("Данные профиля успешно обновлены");
    } catch (e) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async updatePassword(data: IChangePassword) {
    try {
      await this.api.updatePassword(data);
      showNotification("Пароль успешно обновлен");
    } catch (e) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async updateAvatar(data: any) {
    try {
      await this.api.updateAvatar(data);
      showNotification("Аватар успешно обновлен");
    } catch (e) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async searchUser(login: string) {
    try {
      const users = await this.api.searchUser(login);

      store.set("searchUserText", login);
      store.set("users", users);
    } catch (e) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }
}

export default new UserController();
