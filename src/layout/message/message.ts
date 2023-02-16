import { Block } from "../../utils/block";
import messageTemplate from "bundle-text:./message.hbs";
import styles from "./message.module.scss";

interface MessageProps {
  content: string;
  isMine: boolean;
}

class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(messageTemplate, { ...this.props, styles });
  }
}

export { Message };
