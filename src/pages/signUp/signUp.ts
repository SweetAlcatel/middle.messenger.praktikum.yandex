import { Block } from "../../utils/block";
import signUpTemplate from "bundle-text:./signUp.hbs";
import { Button } from "../../layout/button/button";
import { Input } from "../../layout/input/input";
import { Link } from "../../layout/link/link";
import { authInstance } from "../../controllers/authController";
import styles from "./signUp.module.scss";
import { FixMeLater } from "../../types";

class SignUpPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.firstName = new Input({
      name: "first_name",
      type: "text",
      placeholder: "Имя",
    });

    this.children.secondName = new Input({
      name: "second_name",
      type: "text",
      placeholder: "Фамилия",
    });

    this.children.email = new Input({
      name: "email",
      type: "email",
      placeholder: "E-mail",
    });

    this.children.login = new Input({
      name: "login",
      type: "text",
      placeholder: "Логин",
    });

    this.children.phone = new Input({
      name: "phone",
      type: "tel",
      placeholder: "Телефон",
    });

    this.children.password = new Input({
      name: "password",
      type: "password",
      placeholder: "Пароль",
    });

    this.children.button = new Button({
      text: "Зарегистрироваться",
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.link = new Link({
      link: "Есть аккаунт?",
      to: "/",
    });
  }

  onSubmit() {
    const values = Object.values(this.children)
      .filter((child) => child instanceof Input)
      .map((child) => [
        (child as Input).getName(),
        (child as Input).getValue(),
      ]);

    const data = Object.fromEntries(values);

    authInstance.signup(data as FixMeLater);
  }

  render() {
    return this.compile(signUpTemplate, { ...this.props, styles });
  }
}

export { SignUpPage };
