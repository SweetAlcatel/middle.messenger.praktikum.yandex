import changePasswordProfileTemplate from "bundle-text:./changePasswordProfile.hbs";
import { Block } from "../../utils/block";

class ChangePasswordProfilePage extends Block {
  constructor(props) {
    super("div", props);
  }

  render() {
    return this.compile(changePasswordProfileTemplate, { ...this.props });
  }
}

export const changePasswordProfilePage = new ChangePasswordProfilePage({});
