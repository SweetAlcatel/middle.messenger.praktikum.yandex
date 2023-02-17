import { Block } from "../../utils/block";
import signUpTemplate from "bundle-text:./signUp.hbs";
import { Button } from "../../layout/button/button";
import { Input } from "../../layout/input/input";
import { Link } from "../../layout/link/link";
import styles from "./signUp.module.scss";
import { validation } from "../../utils/validation";
import store from "../../utils/store";
import { withStore } from "../../utils/store";
import { SignupData } from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";

let errors;
export class SignUpBase extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.email = new Input({
      name: "email",
      type: "text",
      placeholder: "Email",
      events: {
        blur: () => this.blur(),
      },
    });

    this.children.login = new Input({
      name: "login",
      type: "text",
      placeholder: "Логин",
      events: {
        blur: () => this.blur(),
      },
    });

    this.children.first_name = new Input({
      name: "first_name",
      type: "text",
      placeholder: "Имя",
      events: {
        blur: () => this.blur(),
      },
    });

    this.children.second_name = new Input({
      name: "second_name",
      type: "text",
      placeholder: "Фамилия",
      events: {
        blur: () => this.blur(),
      },
    });

    this.children.phone = new Input({
      name: "phone",
      type: "text",
      placeholder: "Телефон",
      events: {
        blur: () => this.blur(),
      },
    });

    this.children.password = new Input({
      name: "password",
      type: "password",
      placeholder: "Пароль",
      events: {
        blur: () => this.blur(),
      },
    });

    this.children.repeat_password = new Input({
      name: "repeat_password",
      type: "password",
      placeholder: "Повторите пароль",
      events: {
        blur: () => this.blur(),
      },
    });

    this.children.signup = new Button({
      text: "Зарегистрироваться",
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.signin = new Link({
      label: "Войти",
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

    const registationData = Object.fromEntries(values);

    errors = {
      error_email: "",
      error_login: "",
      error_password: "",
      error_repeat_password: "",
      error_first_name: "",
      error_second_name: "",
      error_phone: "",
    };

    const resultValidation = validation(registationData, errors);

    store.set("errors", errors);

    if (resultValidation) {
      AuthController.signup(registationData as SignupData);
    }
  }

  blur() {
    const values = Object.values(this.children)
      .filter((child) => child instanceof Input)
      .map((child) => [
        (child as Input).getName(),
        (child as Input).getValue(),
      ]);

    const registationData = Object.fromEntries(values);

    errors = {
      error_email: "",
      error_login: "",
      error_password: "",
      error_repeat_password: "",
      error_first_name: "",
      error_second_name: "",
      error_phone: "",
    };

    const resultValidation = validation(registationData, errors);

    store.set("errors", errors);
  }

  render() {
    return this.compile(signUpTemplate, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.errors, styles }));

export const SignUpPage = withUser(SignUpBase);
