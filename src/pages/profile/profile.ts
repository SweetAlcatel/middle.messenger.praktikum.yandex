import { Block } from "../../utils/block";
import profileTemplate from "bundle-text:./profile.hbs";
import { Button } from "../../layout/button/button";
import { Field } from "../../layout/field/field";
import { authInstance } from "../../controllers/authController";
import { FixMeLater } from "../../types";
import { withStore } from "../../utils/store";
import { router } from "../../index";

const userFields = [
  "id",
  "first_name",
  "second_name",
  "display_name",
  "login",
  "avatar",
  "email",
  "phone",
];

class ProfilePageBase extends Block<FixMeLater> {
  init() {
    this.children.fields = userFields.map((name) => {
      return new Field({ name, value: this.props[name] });
    });

    this.children.changeData = new Button({
      text: "Изменить данные",
      events: {
        click: () => {},
      },
    });

    this.children.changePassword = new Button({
      text: "Изменить пароль",
      events: {
        click: () => {},
      },
    });

    this.children.logoutButton = new Button({
      text: "Выйти",
      events: {
        click: () => {
          authInstance.logout();
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: FixMeLater,
    newProps: FixMeLater
  ): boolean {
    (this.children.fields as FixMeLater[]).forEach((field, i) => {
      field.setProps({ value: newProps[userFields[i]] });
    });

    return false;
  }

  render() {
    return this.compile(profileTemplate, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfilePage = withUser(ProfilePageBase);
