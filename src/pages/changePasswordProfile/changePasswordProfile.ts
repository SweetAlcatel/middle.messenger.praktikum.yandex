import { Block } from "../../utils/block";
import changePasswordProfileTemplate from "bundle-text:./changePasswordProfile.hbs";
import store, { withStore } from "../../utils/store";
import { Link } from "../../layout/link/link";
import UserController from "../../controllers/UserController";
import { Input } from "../../layout/input/input";
import styles from "./changePasswordProfile.module.scss";
import { Button } from "../../layout/button/button";
import { validation } from "../../utils/validation";

let errors;

export class ChangePasswordProfileBase extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.old_password = new Input({
      name: "old_password",
      type: "password",
      placeholder: "Введите старый пароль",
    });

    this.children.new_password = new Input({
      name: "password",
      type: "password",
      placeholder: "Введите новый пароль",
      events: {
        blur: () => this.blur(),
      },
    });

    this.children.repeat_new_password = new Input({
      name: "repeat_password",
      type: "password",
      placeholder: "Повторите пароль",
      events: {
        blur: () => this.blur(),
      },
    });

    this.children.save = new Button({
      text: "Сохранить",
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.link = new Link({
      label: "Отменить",
      to: "/profile",
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
    console.log(data);

    errors = {
      error_email: "",
      error_login: "",
      error_password: "",
      error_repeat_password: "",
      error_first_name: "",
      error_second_name: "",
      error_phone: "",
    };

    const resultValidation = validation(data, errors);

    store.set("errors", errors);

    if (resultValidation) {
      UserController.setpassword({
        oldPassword: data.old_password,
        newPassword: data.password,
      });
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
    return this.compile(changePasswordProfileTemplate, {
      ...this.props,
      styles,
    });
  }
}

const withUser = withStore((state) => ({ ...state.errors, styles }));

export const ChangePasswordProfile = withUser(ChangePasswordProfileBase);
