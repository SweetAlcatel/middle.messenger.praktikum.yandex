import changeDataProfileTemplate from "bundle-text:./changeDataProfile.hbs";
import { Block } from "../../utils/block";

class ChangeDataProfilePage extends Block {
  constructor(props) {
    super("div", props);
  }

  render() {
    return this.compile(changeDataProfileTemplate, { ...this.props });
  }
}

export const changeDataProfilePage = new ChangeDataProfilePage({});
