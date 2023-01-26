import chatsTemplate from "bundle-text:./chats.hbs";
import { Block } from "../../utils/block";
import { Input } from "../../layout/input/input";

interface IChats {}

class Chats extends Block {
  constructor(props: IChats) {
    super("div", props);
  }

  render() {
    return this.compile(chatsTemplate, { ...this.props });
  }
}

export const chatsPage = new Chats({
  name: "Dima",
  isChat: true,
  inputMessage: new Input({
    type: "text",
    name: "message",
    id: "message",
    events: {
      focus: () => console.log("focus"),
      blur: () => console.log("blur"),
    },
    placeholder: "Введите сообщение",
  }),
});
