import { Block } from "../../utils/block";
import buttonTemplate from "bundle-text:./button.hbs";

interface IButton {
  text: string;
  events: {
    [key: string]: (payload: any) => void;
  };
}

export class Button extends Block {
  constructor(props: IButton) {
    super("button", props);
  }

  render() {
    return this.compile(buttonTemplate, { ...this.props });
  }
}

export const button = new Button({
  text: "Зарегистрироваться",
  events: {
    click: (event) => {
      console.log(event);
    },
  },
});
