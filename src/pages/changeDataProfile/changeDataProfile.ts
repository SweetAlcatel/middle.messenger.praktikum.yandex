import changeDataProfileTemplate from "bundle-text:./changeDataProfile.hbs";
import { UserController } from "../../controllers/user";
import { Block } from "../../utils/block";
import store, { withStore } from "../../utils/store";
import { Input } from "../../layout/input/input";
import { Button } from "../../layout/button/button";
import { InfoController } from "../../controllers/info";
import { Avatar } from "../../layout/avatar/avatar";

const userFields = [
  "first_name",
  "second_name",
  "display_name",
  "login",
  "email",
  "phone",
];

class ChangeDataProfilePageBase extends Block {
  constructor() {
    super("div");
  }

  data = {
    first_name: "",
    second_name: "",
    display_name: "",
    login: "",
    email: "",
    phone: "",
  };

  avatarPath = "";

  protected init(): void {
    UserController.getUser().then((data: XMLHttpRequest) => {
      store.set("user", JSON.parse(data.responseText));
    });

    this.children.fields = userFields.map((name: any) => {
      return new Input({
        name,
        value: this.props[name],
        events: {
          focus: (e: { target: HTMLInputElement }) =>
            (this.data[name] = e.target.value),
          blur: (e: { target: HTMLInputElement }) =>
            (this.data[name] = e.target.value),
        },
      });
    });

    this.children.avatar = new Avatar({
      path: this.props.avatar,
    });

    this.children.saveAvatar = new Button({
      text: "Сохранить аватар",
      events: {
        click: () =>
          InfoController.changeAvatar(
            document.getElementById("changeAvatar")?.files[0]
          ),
      },
    });

    this.children.saveInfo = new Button({
      text: "Сохранить",
      events: {
        click: () => {
          InfoController.changeDataUser(this.data);
        },
      },
    });

    console.log(store);
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    /**
     * Обновляем детей
     */
    this.children.fields?.forEach((field: any, i: any) => {
      field.setProps({ value: newProps[userFields[i]] });
    });

    return false;
  }

  render() {
    return this.compile(changeDataProfileTemplate, { ...this.props });
  }
}

const withUser = withStore((state) => {
  return {
    ...state.user,
  };
});

const ChangeDataProfilePage = withUser(ChangeDataProfilePageBase);

export { ChangeDataProfilePage };
