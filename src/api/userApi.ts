import { FixMeLater } from "../types";
import { BaseApi } from "./baseApi";

class UserApi extends BaseApi {
  constructor() {
    super("/user");
  }

  updateProfileData(data: FixMeLater) {
    return this.http.put("/profile", { data });
  }

  updatePassword(data: FixMeLater) {
    return this.http.put("/password", { data });
  }

  read = undefined;
  create = undefined;
  update = undefined;
  delete = undefined;
}

export { UserApi };
