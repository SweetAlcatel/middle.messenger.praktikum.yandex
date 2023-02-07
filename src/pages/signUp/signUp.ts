import signUpHTML from "bundle-text:./signUp.hbs";
import { Block } from "../../utils/block";
import { Input } from "../../layout/input/input";
import { Button } from "../../layout/button/button";
import { FixMeLater } from "src/types";

export class SignUpPage extends Block {
  props = {
    inputEmail: new Input({
      type: "text",
      name: "email",
      id: "email",
      events: {
        focus: (e: FixMeLater) => console.log(e.target.value),
        blur: (e: FixMeLater) => console.log(e.target.value),
      },
      pattern: `([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*@([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*[\.]([A-zА-я])+`,
    }),
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
    inputFirstName: new Input({
      type: "text",
      name: "first_name",
      id: "first_name",
      events: {
        focus: (e: FixMeLater) => console.log(e.target.value),
        blur: (e: FixMeLater) => console.log(e.target.value),
      },
      pattern: `"^[?!,.а-яА-ЯёЁв\s]+$"`,
    }),
    inputSecondName: new Input({
      type: "text",
      name: "second_name",
      id: "second_name",
      events: {
        focus: (e: FixMeLater) => console.log(e.target.value),
        blur: (e: FixMeLater) => console.log(e.target.value),
      },
      pattern: `^[?!,.а-яА-ЯёЁв\s]+$`,
    }),
    inputTelephone: new Input({
      type: "text",
      name: "phone",
      id: "phone",
      events: {
        focus: (e: FixMeLater) => console.log(e.target.value),
        blur: (e: FixMeLater) => console.log(e.target.value),
      },
      pattern: `^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$`,
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
    inputPasswordAgain: new Input({
      type: "password",
      name: "passwordAgain",
      id: "passwordAgain",
      events: {
        focus: (e: FixMeLater) => console.log(e.target.value),
        blur: (e: FixMeLater) => console.log(e.target.value),
      },
      pattern: `/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/`,
    }),
    button: new Button({
      text: "Зарегистрироваться",
      events: {
        click: () => console.log("click"),
      },
    }),
  };
  constructor() {
    super("div", {
      inputEmail: new Input({
        type: "text",
        name: "email",
        id: "email",
        events: {
          focus: (e: FixMeLater) => console.log(e.target.value),
          blur: (e: FixMeLater) => console.log(e.target.value),
        },
        pattern: `([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*@([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*[\.]([A-zА-я])+`,
      }),
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
      inputFirstName: new Input({
        type: "text",
        name: "first_name",
        id: "first_name",
        events: {
          focus: (e: FixMeLater) => console.log(e.target.value),
          blur: (e: FixMeLater) => console.log(e.target.value),
        },
        pattern: `"^[?!,.а-яА-ЯёЁв\s]+$"`,
      }),
      inputSecondName: new Input({
        type: "text",
        name: "second_name",
        id: "second_name",
        events: {
          focus: (e: FixMeLater) => console.log(e.target.value),
          blur: (e: FixMeLater) => console.log(e.target.value),
        },
        pattern: `^[?!,.а-яА-ЯёЁв\s]+$`,
      }),
      inputTelephone: new Input({
        type: "text",
        name: "phone",
        id: "phone",
        events: {
          focus: (e: FixMeLater) => console.log(e.target.value),
          blur: (e: FixMeLater) => console.log(e.target.value),
        },
        pattern: `^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$`,
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
      inputPasswordAgain: new Input({
        type: "password",
        name: "passwordAgain",
        id: "passwordAgain",
        events: {
          focus: (e: FixMeLater) => console.log(e.target.value),
          blur: (e: FixMeLater) => console.log(e.target.value),
        },
        pattern: `/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/`,
      }),
      button: new Button({
        text: "Зарегистрироваться",
        events: {
          click: () => console.log("click"),
        },
      }),
    });
  }

  render() {
    return this.compile(signUpHTML, { ...this.props });
  }
}
