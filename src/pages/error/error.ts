import errorTemplate from "bundle-text:./error.hbs";
import { Block } from "../../utils/block";

export class ClientErrorPage extends Block {
  props = {
    errorCode: "400",
    errorMessage: "Вы не туда попали",
  };

  constructor() {
    super("div");
  }

  render() {
    return this.compile(errorTemplate, { ...this.props });
  }
}

export class ServerErrorPage extends Block {
  props = {
    errorCode: "500",
    errorMessage: "Мы уже фиксим",
  };

  constructor() {
    super("div");
  }

  render() {
    return this.compile(errorTemplate, { ...this.props });
  }
}
