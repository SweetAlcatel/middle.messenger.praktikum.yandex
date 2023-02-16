import chatTemplate from "bundle-text:./chat.hbs";
import { FixMeLater } from "../../types";
import { Block } from "../../utils/block";
import styles from "./chat.module.scss";
import { withStore } from "../../utils/store";

class ChatBase extends Block<FixMeLater> {
  constructor(props: FixMeLater) {
    super(props);
  }

  protected render() {
    return this.compile(chatTemplate, {
      ...this.props,
      isSelected: this.props.id === this.props.selectedChat?.id,
      styles,
    });
  }
}

export const withSelectedChat = withStore((state) => ({
  selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat),
}));

export const Chat = withSelectedChat(ChatBase);
