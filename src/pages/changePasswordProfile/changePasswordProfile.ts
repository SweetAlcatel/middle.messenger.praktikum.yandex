import { Block } from "../../utils/block";
import changePasswordProfile from "bundle-text:./changePasswordProfile.hbs";
import { FixMeLater } from "../../types/index";
import { withStore } from "../../utils/store";
import { Input } from "../../layout/input/input";
import styles from "./changePasswordProfile.module.scss";
import { userInstance } from "../../controllers/userController";
import { Button } from "../../layout/button/button";

class changePasswordProfileBase extends Block<FixMeLater> {
  init() {
    this.children.oldPassword = new Input({
      type: "password",
      placeholder: "Введите старый пароль",
    });

    this.children.newPassword = new Input({
      type: "password",
      placeholder: "Введите новый пароль",
    });

    this.children.newPasswordAgain = new Input({
      type: "password",
      placeholder: "Введите новый пароль еще раз",
    });

    this.children.savePassword = new Button({
      text: "Сохранить пароль",
      events: {
        click: () => {
          this.onSubmit();
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: FixMeLater,
    newProps: FixMeLater
  ): boolean {
    return false;
  }
  onSubmit() {
    const values = Object.values(this.children)
      .filter((child) => child instanceof Input)
      .map((child) => [(child as Input).getValue()]);

    const data = Object.fromEntries(values);

    userInstance.updatePassword(data);
  }

  render() {
    return this.compile(changePasswordProfile, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ChangePasswordProfile = withUser(changePasswordProfileBase);
