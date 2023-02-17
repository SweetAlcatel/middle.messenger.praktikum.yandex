import { Block } from "../../utils/block";
import chatsTemplate from "bundle-text:./chats.hbs";
import { Button } from "../../layout/button/button";
import { SelectedChat } from "../../layout/selectedChat/selectedChat";
import { Modal } from "../../layout/modalNewChat/modalNewChat";
import { ChatsList } from "../../layout/chatList/chatList";
import ChatController from "../../controllers/ChatController";
import store from "../../utils/store";
import { withStore } from "../../utils/store";
import router from "../../utils/router";
import styles from "./chats.module.scss";

class ChatPageBase extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.chatsList = new ChatsList({ isLoaded: false });

    // @ts-ignore
    ChatController.getChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true,
      });
    });

    this.children.newchat = new Button({
      text: "Новый чат",
      events: {
        click: () => this.newChat(),
      },
    });

    this.children.profile = new Button({
      text: "Профиль",
      events: {
        click: () => {
          router.go("/profile");
        },
      },
    });

    this.children.modal = new Modal({
      flagNewChat: false,
    });

    this.children.messenger = new SelectedChat({});
  }
  newChat() {
    store.set("flagNewChat", true);
  }

  render() {
    return this.compile(chatsTemplate, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({ ...state, styles }));

export const ChatPage = withChats(ChatPageBase);
