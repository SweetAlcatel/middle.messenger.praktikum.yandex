import { Block } from "../../utils/block";
import chatLitTemplate from "bundle-text:./chatList.hbs";
import styles from "./chatList.module.scss";
import { Chat } from "../../layout/chat/chat";
import { FixMeLater } from "../../types";
import { withStore } from "../../utils/store";
import { ChatsController } from "../../controllers/chats";

class ChatsListBase extends Block<FixMeLater> {
  constructor(props: FixMeLater) {
    super({ ...props });
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
  }

  protected componentDidUpdate(
    oldProps: FixMeLater,
    newProps: FixMeLater
  ): boolean {
    this.children.chats = this.createChats(newProps);

    return true;
  }

  private createChats(props: FixMeLater) {
    return props.chats.map((data) => {
      return new Chat({
        ...data,
        events: {
          click: () => {
            ChatsController.createChat(data.id);
          },
        },
      });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(chatLitTemplate, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(ChatsListBase);
