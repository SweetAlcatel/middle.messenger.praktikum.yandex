import errorTemplate from "bundle-text:./error.hbs";
import { Block } from "../../utils/block";

class ClientErrorPage extends Block {
  constructor(props) {
    super("div", props);
  }

  render() {
    return this.compile(errorTemplate, { ...this.props });
  }
}

class ServerErrorPage extends Block {
  constructor(props) {
    super("div", props);
  }

  render() {
    return this.compile(errorTemplate, { ...this.props });
  }
}

export const clientErrorPage = new ClientErrorPage({
  errorCode: "400",
  errorMessage: "Вы не туда попали",
});

export const serverErrorPage = new ServerErrorPage({
  errorCode: "500",
  errorMessage: "Мы уже фиксим",
});
