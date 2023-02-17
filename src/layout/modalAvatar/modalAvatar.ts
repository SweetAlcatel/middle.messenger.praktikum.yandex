import { Block } from "../../utils/block";
import { Button } from "../button/button";
import modalAvatarTemplate from "bundle-text:./ModalAvatar.hbs";
import { Input } from "../input/input";
import store from "../../utils/store";
import UserController from "../../controllers/userController";

interface ModalAvatarProps {
  flagNewAvatar: boolean;
  class?: string;
  events?: {
    click: () => void;
  };
}

class ModalAvatar extends Block<ModalAvatarProps> {
  constructor(props: ModalAvatarProps) {
    super(props);
  }

  init() {
    this.children.add = new Button({
      text: "Загрузить",
      events: {
        click: () => {
          store.set("flagNewAvatar", false);

          // @ts-ignore
          const file = (this.children.file.element as HTMLInputElement)
            .files[0];
          if (file) UserController.setavatar(file);
        },
      },
    });

    this.children.file = new Input({
      name: "file",
      id: "load_avatar",
      type: "file",
      placeholder: "выбрать",
    });

    this.children.close = new Button({
      text: "x",
      events: {
        click: () => {
          store.set("flagNewAvatar", false);
        },
      },
    });
  }

  render() {
    return this.compile(modalAvatarTemplate, { ...this.props });
  }
}

export { ModalAvatar };
