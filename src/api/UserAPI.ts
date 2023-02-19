import { IUser } from "./interfaces";
import { HTTPTransport } from "../utils/HTTPTransport";

export type IUserProfileData = Omit<IUser, "id" | "avatar"> & {
  display_name: string;
};

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

type IUserInfoData = {
  display_name: string;
} & IUser;

export class UserAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport("/user");
  }

  updateProfile(data: IUserProfileData): Promise<IUserInfoData> {
    return this.http.put("/profile", { data });
  }

  updatePassword(data: IChangePassword): Promise<void> {
    return this.http.put("/password", { data });
  }

  read(id: string): Promise<IUserInfoData> {
    return this.http.get(`/${id}`, {});
  }

  updateAvatar(data: FormData): Promise<IUserInfoData> {
    return this.http.put("/profile/avatar", {
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  searchUser(login: string): Promise<IUserInfoData[]> {
    return this.http.post("/search", { data: { login } });
  }
}

export default new UserAPI();
