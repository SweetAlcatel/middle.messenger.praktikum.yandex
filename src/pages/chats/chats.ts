import { Block } from "../../utils/block";
import chatsTemplate from "bundle-text:./chats.hbs";
import { SelectedChat } from "../../layout/selectedChat/selectedChat";
import { ChatsList } from "../../layout/chatList/chatList";
import { ChatsController } from "../../controllers/chatsController";
import styles from "./chats.module.scss";

class ChatPage extends Block {
  constructor() {
    super({});
  }

  protected init() {
    this.children.chatsList = new ChatsList({ isLoaded: false });

    this.children.chat = new SelectedChat({});

    ChatsController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true,
      });
    });
  }

  protected render() {
    return this.compile(chatsTemplate, { styles });
  }
}

export { ChatPage };
