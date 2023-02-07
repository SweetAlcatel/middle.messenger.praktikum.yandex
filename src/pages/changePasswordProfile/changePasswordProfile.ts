import changePasswordProfileTemplate from "bundle-text:./changePasswordProfile.hbs";
import { Block } from "../../utils/block";

export class ChangePasswordProfilePage extends Block {
  constructor() {
    super("div");
  }

  render() {
    return this.compile(changePasswordProfileTemplate, { ...this.props });
  }
}
