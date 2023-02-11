import chatTemplate from "bundle-text:./chat.hbs";
import { Block } from "../../utils/block";
import styles from "./chat.module.scss";

class Chat extends Block<any> {
  constructor() {
    super("div");
  }

  render() {
    return this.compile(chatTemplate, { ...this.props, styles });
  }
}

export { Chat };
