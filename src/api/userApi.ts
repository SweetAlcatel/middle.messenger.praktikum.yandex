import BaseAPI from "./BaseAPI";

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  update(data: any) {
    return this.http.put("/profile", data);
  }

  update_password(data: any) {
    return this.http.put("/password", data);
  }

  update_avatar(file: any) {
    return this.http.put("/profile/avatar", file, "img");
  }

  create = undefined;
  read = undefined;
  delete = undefined;
}

export default new UserAPI();
