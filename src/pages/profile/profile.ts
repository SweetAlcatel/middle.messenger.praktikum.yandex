import { Block } from "../../utils/block";
import profileTemplate from "bundle-text:./profile.hbs";
import { Button } from "../../layout/button/button";
import { Field } from "../../layout/field/field";
import { AuthController } from "../../controllers/authController";
import { FixMeLater } from "../../types";
import { withStore } from "../../utils/store";

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

    this.children.logoutButton = new Button({
      text: "Выйти",
      events: {
        click: () => {
          AuthController.logout();
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
