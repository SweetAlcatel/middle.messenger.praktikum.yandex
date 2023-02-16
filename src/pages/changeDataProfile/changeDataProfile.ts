import { Block } from "../../utils/block";
import changeDataProfileTemplage from "bundle-text:./changeDataProfile.hbs";
import { Button } from "../../layout/button/button";
import { Input } from "../../layout/input/input";
import { FixMeLater } from "../../types";
import { withStore } from "../../utils/store";
import styles from "./changeDataProfile.module.scss";
import { userInstance } from "../../controllers/userController";
import { Link } from "../../layout/link/link";

const userFields = [
  "first_name",
  "second_name",
  "display_name",
  "login",
  "email",
  "phone",
];

class ChangeDataProfileBase extends Block<FixMeLater> {
  init() {
    this.children.fields = userFields.map((name: any) => {
      return new Input({
        type: "text",
        name: userFields[name],
      });
    });

    this.children.linkProfile = new Link({
      link: "к профилю",
      to: "/profile",
    });

    this.children.saveInfo = new Button({
      text: "Сохранить",
      events: {
        click: () => {
          const values = Object.values(this.children)
            .filter((child) => child instanceof Input)
            .map((child) => [(child as Input).getValue()]);

          const data = Object.fromEntries(values);
          userInstance.updateData(data);
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
    return this.compile(changeDataProfileTemplage, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ChangeDataProfilePage = withUser(ChangeDataProfileBase);
