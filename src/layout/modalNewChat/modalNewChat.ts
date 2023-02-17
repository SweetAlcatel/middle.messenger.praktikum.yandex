import { Block } from "../../utils/block";
import { Button } from "../button/button";
import template from "bundle-text:./modalNewChat.hbs";
import store from "../../utils/store";
import { Input } from "../../layout/input/input";
import ChatController from "../../controllers/ChatController";
interface ModalProps {
  flagNewChat: boolean;
  class?: string;
  events?: {
    click: () => void;
  };
}

class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super(props);
  }

  init() {
    this.children.add = new Button({
      text: "Добавить",
      events: {
        click: () => {
          store.set("flagNewChat", false);
          const nameChat: string =
            (this.children.title as Input).getValue() || "Новый чат";
          const idUser: number = Number(
            (this.children.login as Input).getValue()
          );

          if (nameChat && idUser) ChatController.createChat(nameChat, idUser);
        },
      },
    });

    this.children.title = new Input({
      name: "title",
      type: "text",
      placeholder: "Название чата",
    });

    this.children.login = new Input({
      name: "login",
      type: "number",
      placeholder: "Id пользователя",
    });

    this.children.close = new Button({
      text: "x",
      events: {
        click: () => {
          store.set("flagNewChat", false);
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { Modal };
