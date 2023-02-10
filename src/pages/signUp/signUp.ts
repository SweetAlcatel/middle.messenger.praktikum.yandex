import signUpHTML from "bundle-text:./signUp.hbs";
import { Block } from "../../utils/block";
import { Input } from "../../layout/input/input";
import { Button } from "../../layout/button/button";
import { router } from "../../index";
import { UserController } from "../../controllers/user";
export class SignUpPage extends Block {
  data = {
    first_name: "",
    second_name: "",
    login: "",
    email: "",
    password: "",
    phone: "",
  };

  protected init(): void {
    this.children.firstName = new Input({
      type: "text",
      name: "first_name",
      events: {
        focus: (e: { target: HTMLInputElement }) =>
          (this.data.first_name = e.target.value),
        blur: (e: { target: HTMLInputElement }) =>
          (this.data.first_name = e.target.value),
      },
      pattern: `"^[?!,.а-яА-ЯёЁв\s]+$"`,
      placeholder: "Имя",
    });

    this.children.secondName = new Input({
      type: "text",
      name: "second_name",
      events: {
        focus: (e: { target: HTMLInputElement }) =>
          (this.data.second_name = e.target.value),
        blur: (e: { target: HTMLInputElement }) =>
          (this.data.second_name = e.target.value),
      },
      pattern: `^[?!,.а-яА-ЯёЁв\s]+$`,
      placeholder: "Фамилия",
    });

    this.children.emailInput = new Input({
      type: "text",
      name: "email",
      events: {
        focus: (e: { target: HTMLInputElement }) =>
          (this.data.email = e.target.value),
        blur: (e: { target: HTMLInputElement }) =>
          (this.data.email = e.target.value),
      },
      pattern: `([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*@([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*[\.]([A-zА-я])+`,
      placeholder: "Почта",
    });

    this.children.loginInput = new Input({
      type: "text",
      name: "login",
      events: {
        focus: (e: { target: HTMLInputElement }) =>
          (this.data.login = e.target.value),
        blur: (e: { target: HTMLInputElement }) =>
          (this.data.login = e.target.value),
      },
      pattern: `'/^[a-zA-Z0-9]+$/'`,
      placeholder: "Логин",
    });

    this.children.password = new Input({
      type: "password",
      name: "password",
      events: {
        focus: (e: { target: HTMLInputElement }) =>
          (this.data.password = e.target.value),
        blur: (e: { target: HTMLInputElement }) =>
          (this.data.password = e.target.value),
      },
      pattern: `/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/`,
      placeholder: "Пароль",
    });

    this.children.phone = new Input({
      type: "text",
      name: "phone",
      events: {
        focus: (e: { target: HTMLInputElement }) =>
          (this.data.phone = e.target.value),
        blur: (e: { target: HTMLInputElement }) =>
          (this.data.phone = e.target.value),
      },
      pattern: `^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$`,
      placeholder: "Телефон",
    });

    this.children.login = new Button({
      text: "Войти",
      events: {
        click: () => {
          UserController.signUp(this.data);
        },
      },
    });

    this.children.haveAccount = new Button({
      text: "Есть аккаунт?",
      events: {
        click: () => {
          router.go("/login");
        },
      },
    });
  }
  constructor() {
    super("div");
  }

  render() {
    return this.compile(signUpHTML, { ...this.props });
  }
}
