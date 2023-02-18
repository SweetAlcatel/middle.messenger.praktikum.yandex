import { Block } from "../../utils/Block";
import template from "./profileEditPass.hbs";
import { getFormData } from "../../helpers/getFormData";
import UserController from "../../controllers/UserController";
import { IChangePassword } from "../../api/UserAPI";

export class ProfileEditPassPage extends Block {
  handleSubmit(e: Event) {
    e.preventDefault();
    const updatePasswordData = getFormData();

    UserController.updatePassword(updatePasswordData as IChangePassword);
  }

  render() {
    return this.compile(template, {
      children: this.children,
      onClick: this.handleSubmit,
    });
  }
}
