import API, { AuthAPI } from "../api/AuthAPI";
import store from "../utils/Store";
import router from "../utils/Router";
import { ISigninData, ISignupData } from "../api/interfaces";
import { NotificationTypes, showNotification } from "../utils/ShowNotification";

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: ISigninData) {
    try {
      await this.api.signin(data);

      router.go("/profile");
    } catch (e) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async signup(data: ISignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go("/profile");
    } catch (e) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();

      store.set("user", user);

      return user;
    } catch (e) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      router.go("/login");
    } catch (e) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }
}

export default new AuthController();
