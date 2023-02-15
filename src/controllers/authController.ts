import { AuthApi, SigninData, SignupData } from "../api/authApi";
import store from "../utils/store";
import { messageInstance } from "./messageController";
import { router } from "../index";

class AuthController {
  private readonly api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      router.go("/profile");
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go("/profile");
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    store.set("user", user);
  }

  async logout() {
    try {
      messageInstance.closeAll();

      await this.api.logout();

      router.go("/");
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export const authInstance = new AuthController();
