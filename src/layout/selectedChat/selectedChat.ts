import selectedChatTemplate from "bundle-text:./selectedChat.hbs";
import { Block } from "../../utils/block";
import { Input } from "../input/input";
import { Button } from "../button/button";
import styles from "./selectedChat.module.scss";
import { withStore } from "../../utils/store";
import { FixMeLater } from "../../types";
import { Message } from "../../layout/message/message";

class SelectedChatBase extends Block<FixMeLater> {
  constructor(props: FixMeLater) {
    super(props);
  }
  protected init() {
    this.children.messages = this.createMessages(this.props);

    this.children.input = new Input({
      type: "text",
      placeholder: "Сообщение",
      name: "message",
    });

    this.children.button = new Button({
      text: "Отправить",
      type: "button",
      events: {
        click: () => {
          const input = this.children.input as Input;
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: FixMeLater,
    newProps: FixMeLater
  ): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: FixMeLater) {
    return props.messages.map((data) => {
      return new Message({ ...data, isMine: props.userId === data.user_id });
    });
  }

  protected render() {
    return this.compile(selectedChatTemplate, { ...this.props, styles });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  };
});

export const SelectedChat = withSelectedChatMessages(SelectedChatBase);
