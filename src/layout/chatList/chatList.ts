import { Block } from "../../utils/block";
import chatListTemplate from "bundle-text:./chatList.hbs";
import { Link } from "../link/link";
import { Chat } from "../chat/chat";
import { withStore } from "../../utils/store";
import styles from "./chatList.module.scss";
import { FixMeLater } from "../../types";
import { ChatsController } from "../../controllers/chatsController";

class ChatsListBase extends Block<FixMeLater> {
  constructor(props: FixMeLater) {
    super({ ...props });
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
    this.children.profileLink = new Link({ to: "/profile", label: "Профиль" });
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
            ChatsController.selectChat(data.id);
          },
        },
      });
    });
  }

  protected render() {
    return this.compile(chatListTemplate, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(ChatsListBase);
