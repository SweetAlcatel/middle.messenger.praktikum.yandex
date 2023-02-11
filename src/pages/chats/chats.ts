import chatsTemplate from "bundle-text:./chats.hbs";
import { Block } from "../../utils/block";
import { Chat } from "../../layout/chat/chat";
import { ChatsController } from "../../controllers/chats";
import store, { withStore } from "../../utils/Store";

export class ChatsBase extends Block {
  constructor() {
    super("div");

    ChatsController.getChats().then((data: XMLHttpRequest) =>
      store.set("chats", JSON.parse(data.responseText))
    );
  }

  protected init(): void {
    this.children.chat = new Chat();
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
