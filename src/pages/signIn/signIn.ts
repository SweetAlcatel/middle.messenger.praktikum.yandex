import loginTemplate from "bundle-text:./signIn.hbs";
import { Block } from "../../utils/block";

class SignInPage extends Block {
  constructor(props) {
    super("div", props);
  }

  render() {
    return this.compile(loginTemplate, { ...this.props });
  }
}

export const signInPage = new SignInPage({});
