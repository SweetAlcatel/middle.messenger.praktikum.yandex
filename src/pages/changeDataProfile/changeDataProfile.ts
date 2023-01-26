import changeDataProfileTemplate from "bundle-text:./changeDataProfile.hbs";
import { Block } from "../../utils/block";

interface IChangeDataProfilePage {}

class ChangeDataProfilePage extends Block {
  constructor(props: IChangeDataProfilePage) {
    super("div", props);
  }

  render() {
    return this.compile(changeDataProfileTemplate, { ...this.props });
  }
}

export const changeDataProfilePage = new ChangeDataProfilePage({});
