import { Block } from "../../utils/block";
import signInTemplate from "bundle-text:./signIn.hbs";
import styles from "./signIn.module.scss";
import { Button } from "../../layout/button/button";
import { Input } from "../../layout/input/input";
import { Link } from "../../layout/link/link";
import { authInstance } from "../../controllers/authController";

class SignInPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.login = new Input({
      name: "login",
      type: "text",
      placeholder: "Логин",
      pattern: `/^(?=.*[a-zA-Z])([\w-_]{3,20})$/`,
    });

    this.children.password = new Input({
      name: "password",
      type: "password",
      placeholder: "Пароль",
      pattern: `/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/`,
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

          authInstance.signin(data as any);
        },
      },
    });

    this.children.link = new Link({
      link: "Регистрация",
      to: "/signUp",
    });
  }

  render() {
    return this.compile(signInTemplate, { ...this.props, styles });
  }
}

export { SignInPage };
