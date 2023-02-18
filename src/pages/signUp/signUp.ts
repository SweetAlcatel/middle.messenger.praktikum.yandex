import { Block } from "../../utils/Block";
import template from "./signUp.hbs";
import { getFormData } from "../../helpers/getFormData";
import AuthController from "../../controllers/AuthController";
import { ISignupData } from "../../api/interfaces";

export class SignUpPage extends Block {
  constructor() {
    super({});
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const signupData = getFormData();
    AuthController.signup(signupData as ISignupData);
  }

  render() {
    return this.compile(template, {
      children: this.children,
      onClick: this.handleSubmit,
    });
  }
}
