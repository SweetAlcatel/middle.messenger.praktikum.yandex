import loginTemplate from "bundle-text:./signIn.hbs";
import { Input } from "../../layout/input/input";
import { Button } from "../../layout/button/button";
import { Block } from "../../utils/block";
import { FixMeLater } from "../../types/index";

interface ISignInPage {}

class SignInPage extends Block {
  constructor(props: ISignInPage) {
    super("div", props);
  }

  render() {
    return this.compile(loginTemplate);
  }
}

export const signInPage = new SignInPage({
  inputLogin: new Input({
    type: "text",
    name: "login",
    id: "login",
    events: {
      focus: (e: FixMeLater) => console.log(e.target.value),
      blur: (e: FixMeLater) => console.log(e.target.value),
    },
    pattern: `'/^[a-zA-Z0-9]+$/'`,
  }),
  inputPassword: new Input({
    type: "password",
    name: "password",
    id: "password",
    events: {
      focus: (e: FixMeLater) => console.log(e.target.value),
      blur: (e: FixMeLater) => console.log(e.target.value),
    },
    pattern: `/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/`,
  }),
  button: new Button({
    text: "Авторизоваться",
    events: {
      click: () => console.log("click"),
    },
  }),
});
