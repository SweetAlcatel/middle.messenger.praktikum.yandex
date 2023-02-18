import { Block } from "../../utils/Block";
import template from "./error.hbs";

export class ErrorPage extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(template, {
      text: this.props.text,
      error: this.props.error,
    });
  }
}
