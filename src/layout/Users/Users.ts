import { Block } from "../../utils/Block";
import template from "./users.hbs";
import styles from "./styles.module.scss";
import { withStore } from "../../utils/Store";
import UserController from "../../controllers/UserController";
import ChatController from "../../controllers/ChatController";

export class UsersBase extends Block {
  init() {
    UserController.searchUser("");
  }

  handleSearchUser(e: Event) {
    e.preventDefault();

    const input = document.getElementById("search-user") as HTMLInputElement;

    if (input) {
      const value = input.value;
      UserController.searchUser(value);
    }
  }

  handleAddUser = (e: Event) => {
    const target = e.target as HTMLButtonElement;
    const userId = Number(target.id);
    const chatId = this.props.activeChat;

    ChatController.addUsersToChat({ users: [userId], chatId });
  };

  render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
      onSearch: this.handleSearchUser,
      onAdd: this.handleAddUser,
      styles,
    });
  }
}

const withUsers = withStore((state) => {
  return {
    users: [...(state.users || [])],
    searchUserText: state.searchUserText,
  };
});

export const Users = withUsers(UsersBase);
