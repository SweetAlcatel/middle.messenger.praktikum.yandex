import changePasswordProfileTemplate from "bundle-text:./changePasswordProfile.hbs";
import { Block } from "../../utils/block";

interface IChangePasswordProfilePage {}

class ChangePasswordProfilePage extends Block {
  constructor(props: IChangePasswordProfilePage) {
    super("div", props);
  }

  render() {
    return this.compile(changePasswordProfileTemplate, { ...this.props });
  }
}

export const changePasswordProfilePage = new ChangePasswordProfilePage({});
