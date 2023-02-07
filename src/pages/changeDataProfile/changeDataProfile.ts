import changeDataProfileTemplate from "bundle-text:./changeDataProfile.hbs";
import { Block } from "../../utils/block";

class ChangeDataProfilePage extends Block {
  constructor() {
    super("div");
  }

  render() {
    return this.compile(changeDataProfileTemplate, { ...this.props });
  }
}

export { ChangeDataProfilePage };
