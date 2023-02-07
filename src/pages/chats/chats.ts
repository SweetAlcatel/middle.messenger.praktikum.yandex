import chatsTemplate from "bundle-text:./chats.hbs";
import { Block } from "../../utils/block";
import { Input } from "../../layout/input/input";

export class Chats extends Block {
  props = {
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
  };

  constructor() {
    super("div", {
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
  }

  render() {
    return this.compile(chatsTemplate, { ...this.props });
  }
}
