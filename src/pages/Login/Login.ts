import { Block } from "../../utils/Block";
import template from "./login.hbs";
import { getFormData } from "../../helpers/getFormData";
import AuthController from "../../controllers/AuthController";
import { ISigninData } from "../../api/interfaces";

export class LoginPage extends Block {
  constructor() {
    super({});
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const signinData = getFormData();

    AuthController.signin(signinData as ISigninData);
  }

  render() {
    return this.compile(template, {
      children: this.children,
      onClick: this.handleSubmit,
    });
  }
}
