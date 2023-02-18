import template from "./dialog.hbs";
import { Block } from "../../utils/Block";
import styles from "./styles.module.scss";
import MessageController from "../../controllers/MessageController";

export class Dialog extends Block {
  handleSend(e: Event) {
    e.preventDefault();
    const input = document.getElementById("message") as HTMLInputElement;

    if (input) {
      const value = input.value;

      MessageController.sendMessage(value);
    }
  }

  render() {
    const reverseMessages = this.props.messages.reverse();

    return this.compile(template, {
      ...this.props,
      messages: reverseMessages,
      onSend: this.handleSend,
      children: this.children,
      styles,
    });
  }
}
