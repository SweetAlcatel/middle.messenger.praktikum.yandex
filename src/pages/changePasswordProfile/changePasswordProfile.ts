import changePasswordProfileTemplate from "bundle-text:./changePasswordProfile.hbs";
import { Input } from "../../layout/input/input";
import { Block } from "../../utils/block";
import { InfoController } from "../../controllers/info";
import { Button } from "../../layout/button/button";

export class ChangePasswordProfilePage extends Block {
  constructor() {
    super("div");
  }

  data = {
    oldPassword: "",
    newPassword: "",
    newPassowordAgain: "",
  };

  protected init(): void {
    this.children.oldPassword = new Input({
      type: "password",
      name: "oldPassword",
      placeholder: "Старый пароль",
      events: {
        focus: (e: { target: HTMLInputElement }) =>
          (this.data.oldPassword = e.target.value),
        blur: (e: { target: HTMLInputElement }) =>
          (this.data.oldPassword = e.target.value),
      },
    });

    this.children.newPassword = new Input({
      type: "password",
      name: "newPassword",
      placeholder: "Новый пароль",
      events: {
        focus: (e: { target: HTMLInputElement }) =>
          (this.data.newPassword = e.target.value),
        blur: (e: { target: HTMLInputElement }) =>
          (this.data.newPassword = e.target.value),
      },
    });

    this.children.newPasswordAgain = new Input({
      type: "password",
      name: "newPasswordAgain",
      placeholder: "Новый пароль еще раз",
      events: {
        focus: (e: { target: HTMLInputElement }) =>
          (this.data.newPassowordAgain = e.target.value),
        blur: (e: { target: HTMLInputElement }) =>
          (this.data.newPassowordAgain = e.target.value),
      },
    });

    this.children.saveButton = new Button({
      text: "Сохранить",
      events: {
        click: () => InfoController.changePassword(this.data),
      },
    });
  }

  render() {
    return this.compile(changePasswordProfileTemplate, { ...this.props });
  }
}
