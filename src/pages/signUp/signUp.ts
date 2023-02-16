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
      pattern: `/^[А-ЯЁA-Z][а-яёa-z-]*$/`,
    });

    this.children.secondName = new Input({
      name: "second_name",
      type: "text",
      placeholder: "Фамилия",
      pattern: `/^[А-ЯЁA-Z][а-яёa-z-]*$/`,
    });

    this.children.email = new Input({
      name: "email",
      type: "email",
      placeholder: "E-mail",
      pattern: `/^[a-zA-Z0-9._-]+@[a-zA-Z._-]+\.[a-zA-Z]{2,}$/`,
    });

    this.children.login = new Input({
      name: "login",
      type: "text",
      placeholder: "Логин",
      pattern: `/^(?=.*[a-zA-Z])([\w-_]{3,20})$/`,
    });

    this.children.phone = new Input({
      name: "phone",
      type: "tel",
      placeholder: "Телефон",
      pattern: `/^(8|\+7)[0-9]{10,15}$/`,
    });

    this.children.password = new Input({
      name: "password",
      type: "password",
      placeholder: "Пароль",
      pattern: `/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/`,
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
