import { UserApi } from "../api/userApi";
import { FixMeLater } from "../types";

class UserController {
  private readonly api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  async updateData(data: FixMeLater) {
    try {
      await this.api.updateProfileData(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  async updatePassword(data: FixMeLater) {
    try {
      await this.api.updatePassword(data);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export const userInstance = new UserController();
