import { Block } from "../../utils/block";
import buttonTemplate from "./button.hbs";
import { render } from "../../utils/render";

class Button extends Block {
  constructor(props) {
    // Создаём враппер DOM-элемент button
    super("button", props);
  }

  render() {
    const { text } = this.props;
    return buttonTemplate({ text });
  }
}

export const button = new Button({
  text: "test button",
  events: {
    click: (event) => {
      console.log(event);
    },
  },
});

render(".root", button);
