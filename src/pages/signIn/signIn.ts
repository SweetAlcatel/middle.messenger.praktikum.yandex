import { Block } from "../../utils/block";
import signInTemplate from "bundle-text:./signIn.hbs";
import styles from "./signIn.module.scss";
import { Button } from "../../layout/button/button";
import { Input } from "../../layout/input/input";
import { Link } from "../../layout/link/link";
import AuthController from "../../controllers/authController";

class SignInPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.login = new Input({
      name: "login",
      type: "text",
      placeholder: "Логин",
    });

    this.children.password = new Input({
      name: "password",
      type: "password",
      placeholder: "Пароль",
    });

    this.children.button = new Button({
      text: "Войти",
      events: {
        click: () => {
          const values = Object.values(this.children)
            .filter((child) => child instanceof Input)
            .map((child) => [
              (child as Input).getName(),
              (child as Input).getValue(),
            ]);

          const data = Object.fromEntries(values);

          AuthController.signin(data as any);
        },
      },
    });

    this.children.link = new Link({
      label: "Регистрация",
      to: "/signUp",
    });
  }

  render() {
    return this.compile(signInTemplate, { ...this.props, styles });
  }
}

export { SignInPage };
