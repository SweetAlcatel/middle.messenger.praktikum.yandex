import { Block } from "../../utils/block";
import changeDataProfileTemplage from "bundle-text:./changeDataProfile.hbs";
import { Button } from "../../layout/button/button";
import { Input } from "../../layout/input/input";
import { Icon } from "../../layout/icon/icon";
import AuthController from "../../controllers/authController";
import UserController from "../../controllers/userController";
import avatar from "../../../public/static/icons/avatar.png";
import { withStore } from "../../utils/store";
import store from "../../utils/store";
import styles from "./changeDataProfile.module.scss";

class ChangeDataProfileBase extends Block {
  init() {
    this.children.back_icon = new Button({
      text: "Выйти",
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });

    this.children.avatar = new Icon({
      url:
        `https://ya-praktikum.tech/api/v2/resources${
          store.getState()?.user?.avatar
        }` || avatar,
      events: {
        click: () => {},
      },
    });

    this.children.editemail = new Input({
      name: "email",
      type: "text",
      placeholder: "",
    });
    (this.children.editemail as Input).setValue(store.getState()?.user?.email);

    this.children.editlogin = new Input({
      name: "login",
      type: "text",
      placeholder: "",
    });
    (this.children.editlogin as Input).setValue(store.getState()?.user?.login);

    this.children.editfirst_name = new Input({
      name: "first_name",
      type: "text",
      placeholder: "",
    });
    (this.children.editfirst_name as Input).setValue(
      store.getState()?.user?.first_name
    );

    this.children.editsecond_name = new Input({
      name: "second_name",
      type: "text",
      placeholder: "",
    });
    (this.children.editsecond_name as Input).setValue(
      store.getState()?.user?.second_name
    );

    this.children.editphone = new Input({
      name: "phone",
      type: "text",
      placeholder: "",
    });
    (this.children.editphone as Input).setValue(store.getState()?.user?.phone);

    this.children.button_exit = new Button({
      text: "Сохранить",
      events: {
        click: () => this.onSubmit(),
      },
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

    const newdata = {
      first_name: data.first_name,
      second_name: data.second_name,
      display_name: store.getState().user.display_name || data.first_name,
      login: data.login,
      email: data.email,
      phone: data.phone,
    };

    console.log(newdata);
    UserController.setdata(newdata);
  }

  render() {
    return this.compile(changeDataProfileTemplage, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ChangeDataProfile = withUser(ChangeDataProfileBase);
