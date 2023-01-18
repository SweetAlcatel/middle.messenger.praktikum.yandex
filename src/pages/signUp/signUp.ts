import signUpHTML from "bundle-text:./signUp.hbs";
import { Block } from "../../utils/block";

class SignUpPage extends Block {
  constructor(props) {
    super("div", props);
  }
  render() {
    return this.compile(signUpHTML, { ...this.props });
  }
}

console.log(typeof signUpHTML);

export const signUpPage = new SignUpPage({});
