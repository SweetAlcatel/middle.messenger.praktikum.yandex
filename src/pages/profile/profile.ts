import { Block } from "../../utils/Block";
import template from "bundle-text:./profile.hbs";
import store, { withStore } from "../../utils/Store";
import { Button } from "../../layout/button/button";
import { Field } from "../../layout/field/field";
import { UserController } from "../../controllers/user";
import { router } from "../../index";

const userFields = [
  "id",
  "first_name",
  "second_name",
  "display_name",
  "login",
  "avatar",
  "email",
  "phone",
] as Array<keyof ProfileProps>;

class ProfilePageBase extends Block<ProfileProps> {
  init() {
    this.children.logoutButton = new Button({
      text: "Выйти",
      events: {
        click: () => {
          UserController.logOut();
          router.go("/");
        },
      },
    });

    this.children.fields = userFields.map((name: string) => {
      return new Field({ name, value: this.props[name] });
    });

    UserController.getUser().then((data: XMLHttpRequest) => {
      console.log(data);
      store.set("user", JSON.parse(data.responseText));
    });
  }

  protected componentDidUpdate(
    oldProps: ProfileProps,
    newProps: ProfileProps
  ): boolean {
    /**
     * Обновляем детей
     */
    (this.children.fields as ProfileField[]).forEach((field, i) => {
      field.setProps({ value: newProps[userFields[i]] });
    });

    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => {
  return {
    ...state.user,
  };
});

export const ProfilePage = withUser(ProfilePageBase);
