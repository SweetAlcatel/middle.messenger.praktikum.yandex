import loginTemplate from "bundle-text:./signIn.hbs";
import { Input } from "../../layout/input/input";
import { Button } from "../../layout/button/button";
import { Block } from "../../utils/block";
import { router } from "../../index";
import { UserController } from "../../controllers/user";

export class SignInPage extends Block {
  constructor() {
    super("div");
  }

  private authData = {
    login: "",
    password: "",
  };

  protected init(): void {
    this.children.loginInput = new Input({
      type: "text",
      name: "login",
      events: {
        focus: (e: { target: HTMLInputElement }) =>
          (this.authData.login = e.target.value),
        blur: (e: { target: HTMLInputElement }) =>
          (this.authData.login = e.target.value),
      },
      pattern: `'/^[a-zA-Z0-9]+$/'`,
      placeholder: "Логин",
    });

    this.children.passwordInput = new Input({
      type: "password",
      name: "password",
      events: {
        focus: (e: { target: HTMLInputElement }) =>
          (this.authData.password = e.target.value),
        blur: (e: { target: HTMLInputElement }) =>
          (this.authData.password = e.target.value),
      },
      pattern: `/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/`,
      placeholder: "Пароль",
    });

    this.children.buttonLogin = new Button({
      text: "Авторизироваться",
      events: {
        click: () => {
          UserController.signIn(this.authData);
        },
      },
    });

    this.children.noAccount = new Button({
      text: "Нет аккаунта?",
      events: {
        click: () => router.go("/registration"),
      },
    });
  }

  render() {
    return this.compile(loginTemplate, { ...this.props });
  }
}
