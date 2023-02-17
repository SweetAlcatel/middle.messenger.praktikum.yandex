import { Block } from "../../utils/block";
import profileTemplate from "bundle-text:./profile.hbs";
import { Button } from "../../layout/button/button";
import { Icon } from "../../layout/icon/icon";
import router from "../../utils/router";
import store, { withStore } from "../../utils/store";
import AuthController from "../../controllers/AuthController";
import { ModalAvatar } from "../../layout/modalAvatar/modalAvatar";
import avatar from "../../../public/static/icons/avatar.png";
import styles from "./profile.module.scss";

class ProfilePageBase extends Block {
  init() {
    let avatarUser = avatar;

    if (store.getState().user) {
      avatarUser = `https://ya-praktikum.tech/api/v2/resources${
        store.getState().user.avatar
      }`;
    }

    this.children.back = new Button({
      text: "Назад к чатам",
      events: {
        click: () => {
          router.go("/chats");
        },
      },
    });

    this.children.avatar = new Icon({
      url: avatarUser,
      events: {
        click: () => {
          store.set("flagNewAvatar", true);
        },
      },
    });

    this.children.button_change_data = new Button({
      text: "Изменить данные",
      events: {
        click: () => {
          router.go("/changeData");
        },
      },
    });

    this.children.button_change_password = new Button({
      text: "Изменить пароль",
      events: {
        click: () => {
          router.go("/changePassword");
        },
      },
    });

    this.children.button_exit = new Button({
      text: "Выйти",
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });

    this.children.modal = new ModalAvatar({
      flagNewAvatar: false,
    });
  }

  render() {
    return this.compile(profileTemplate, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({
  ...state.user,
  flagNewAvatar: state.flagNewAvatar,
}));

export const ProfilePage = withUser(ProfilePageBase);
