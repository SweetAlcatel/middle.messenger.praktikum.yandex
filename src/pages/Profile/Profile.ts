import { Block } from "../../utils/Block";
import template from "./profile.hbs";
import { withStore } from "../../utils/Store";
import AuthController from "../../controllers/AuthController";
import styles from "./styles.module.scss";

class ProfilePageBase extends Block {
  init() {
    AuthController.fetchUser();
  }

  render() {
    const handleLogout = () => {
      AuthController.logout();
    };

    return this.compile(template, {
      ...this.props,
      children: this.children,
      onLogout: handleLogout,
    });
  }
}

export const withUser = withStore((state) => ({
  ...state.user,
  styles,
}));

export const ProfilePage = withUser(ProfilePageBase);
