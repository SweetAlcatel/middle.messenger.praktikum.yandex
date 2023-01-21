import signUpHTML from "bundle-text:./signUp.hbs";
import { Block } from "../../utils/block";
import { Input } from "../../layout/input/input";
import stylesInput from "../../layout/input/input.module.scss";

class SignUpPage extends Block {
  constructor(props: any) {
    super("div", props);
  }
  render() {
    return this.compile(signUpHTML, { ...this.props });
  }
}

export const signUpPage = new SignUpPage({
  inputEmail: new Input({
    type: "text",
    name: "email",
    id: "email",
    className: stylesInput.inputEnter,
    events: {
      focus: () => console.log("focus"),
      blur: () => console.log("blur"),
    },
    pattern: `([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*@([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*[\.]([A-zА-я])+`,
  }),
  inputLogin: new Input({
    type: "text",
    name: "login",
    id: "login",
    className: stylesInput.inputEnter,
    events: {
      focus: () => console.log("focus"),
      blur: () => console.log("blur"),
    },
    pattern: `'/^[a-zA-Z0-9]+$/'`,
  }),
  inputFirstName: new Input({
    type: "text",
    name: "first_name",
    id: "first_name",
    className: stylesInput.inputEnter,
    events: {
      focus: () => console.log("focus"),
      blur: () => console.log("blur"),
    },
    pattern: `"^[?!,.а-яА-ЯёЁв\s]+$"`,
  }),
  inputSecondName: new Input({
    type: "text",
    name: "second_name",
    id: "second_name",
    className: stylesInput.inputEnter,
    events: {
      focus: () => console.log("focus"),
      blur: () => console.log("blur"),
    },
    pattern: `^[?!,.а-яА-ЯёЁв\s]+$`,
  }),
  inputTelephone: new Input({
    type: "text",
    name: "phone",
    id: "phone",
    className: stylesInput.inputEnter,
    events: {
      focus: () => console.log("focus"),
      blur: () => console.log("blur"),
    },
    pattern: `^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$`,
  }),
  inputPassword: new Input({
    type: "password",
    name: "password",
    id: "password",
    className: stylesInput.inputEnter,
    events: {
      focus: () => console.log("focus"),
      blur: () => console.log("blur"),
    },
    pattern: `/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/`,
  }),
  inputPasswordAgain: new Input({
    type: "password",
    name: "passwordAgain",
    id: "passwordAgain",
    className: stylesInput.inputEnter,
    events: {
      focus: () => console.log("focus"),
      blur: () => console.log("blur"),
    },
    pattern: `/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/`,
  }),
  inputSubmit: new Input({
    value: "Зарегистрироваться",
    type: "submit",
    className: stylesInput.inputSubmit,
    events: {
      click: () => console.log("clicked"),
    },
  }),
});
