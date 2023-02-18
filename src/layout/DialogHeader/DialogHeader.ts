import template from "./dialogHeader.hbs";
import { Block } from "../../utils/Block";
import styles from "./styles.module.scss";
import ChatController from "../../controllers/ChatController";

export class DialogHeader extends Block {
  constructor(props: any) {
    super({ ...props });
  }

  render() {
    const handleDeleteDialog = (e: Event) => {
      e.preventDefault();
      ChatController.removeChat(this.props.activeChatId);
      this.setProps({ activeChat: "" });
    };

    return this.compile(template, {
      ...this.props,
      children: this.children,
      onDelete: handleDeleteDialog,
      onAddUser: this.props.showUsersForm,
      styles,
    });
  }
}
