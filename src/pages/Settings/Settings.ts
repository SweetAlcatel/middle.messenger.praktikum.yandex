import { Block } from "../../utils/Block";
import template from "./settings.hbs";
import { getFormData } from "../../helpers/getFormData";
import UserController from "../../controllers/UserController";
import { IUserProfileData } from "../../api/UserAPI";
import { withUser } from "../Profile/Profile";
import { getFirstFile } from "../../utils/GetFirstFile";

export class SettingsPageBase extends Block {
  handleSubmit(e: Event) {
    e.preventDefault();

    const updateProfileData = getFormData();
    const avatar = document.getElementById("avatar") as HTMLInputElement | null;
    const formData = new FormData();

    if (avatar && getFirstFile(avatar)) {
      formData.append("avatar", getFirstFile(avatar));
      UserController.updateAvatar(formData);
    }

    UserController.updateProfile(updateProfileData as IUserProfileData);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
      onClick: this.handleSubmit,
    });
  }
}

export const SettingsPage = withUser(SettingsPageBase);
