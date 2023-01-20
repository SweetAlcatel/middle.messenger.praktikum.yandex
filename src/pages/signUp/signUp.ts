import signUpHTML from "bundle-text:./signUp.hbs";
import { Block } from "../../utils/block";
import { Input } from "../../layout/input/input";
import stylesInput from "../../layout/input/input.module.scss";

class SignUpPage extends Block {
  constructor(props) {
    super("div", props);
  }
  render() {
    return this.compile(signUpHTML, { ...this.props });
  }
}

export const signUpPage = new SignUpPage({
  inputSubmit: new Input({
    value: "Зарегистрироваться",
    type: "submit",
    className: stylesInput.inputSubmit,
    events: {
      click: () => console.log("clicked"),
    },
  }),
});
