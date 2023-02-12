import chatsTemplate from "bundle-text:./chats.hbs";
import { Block } from "../../utils/block";
import { ChatsController } from "../../controllers/chats";
import { withStore } from "../../utils/store";
import { ChatsList } from "../../layout/chatList/chatList";
import { SelectedChat } from "../../layout/selectedChat/selectedChat";

export class ChatsBase extends Block {
  constructor() {
    super("div");
  }

  protected init(): void {
    this.children.chatsList = new ChatsList({ isLoaded: false });

    this.children.chat = new SelectedChat({});

    ChatsController.getChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true,
      });
    });
  }

  render() {
    return this.compile(chatsTemplate, { ...this.props });
  }
}

const withChats = withStore((state) => {
  return {
    ...state.chats,
  };
});

export const ChatsPage = withChats(ChatsBase);
