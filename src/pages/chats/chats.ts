import chatsTemplate from "bundle-text:./chats.hbs";
import { Block } from "../../utils/block";

class Chats extends Block {
  constructor(props) {
    super("div", props);
  }

  render() {
    return this.compile(chatsTemplate, { ...this.props });
  }
}

export const chatsPage = new Chats({
  name: "Dima",
  isChat: true,
});
