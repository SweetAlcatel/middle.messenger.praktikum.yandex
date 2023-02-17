import API, { UserAPI } from "../api/userApi";
import store from "../utils/store";
import router from "../utils/router";
import AuthController from "./authController";

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async setavatar(file: any) {
    try {
      await this.api.update_avatar(file);
      await AuthController.fetchUser();
    } catch (e: any) {
      console.error(e);
    }
  }

  async setdata(data: any) {
    try {
      await this.api.update(data);
      await AuthController.fetchUser();

      router.go("/profile");
    } catch (e: any) {
      console.error(e);
    }
  }

  async setpassword(data: any) {
    try {
      await this.api.update_password(data);

      router.go("/profile");
    } catch (e: any) {
      store.getState().errors.error_password = "пароль введен неверно";
      console.error(e);
    }
  }
}

export default new UserController();
