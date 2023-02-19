import { Block } from "../../utils/Block";
import template from "./signIn.hbs";
import { getFormData } from "../../helpers/getFormData";
import AuthController from "../../controllers/AuthController";
import { ISigninData } from "../../api/interfaces";

export class SignInPage extends Block {
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
