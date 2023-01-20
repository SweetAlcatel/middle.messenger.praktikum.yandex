import { Block } from "../../utils/block";
import buttonTemplate from "bundle-text:./button.hbs";

export class Button extends Block {
  constructor(props) {
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
