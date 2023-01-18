import { Block } from "../../utils/block";
import buttonTemplate from "bundle-text:./button.hbs";
import Handlebars from "handlebars";
import { render } from "../../utils/render";

export class Button extends Block {
  constructor(props) {
    super("button", props);
  }

  render() {
    const comp = Handlebars.compile(buttonTemplate);
    const result = comp({
      ...this.props,
    });
    return result;
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
