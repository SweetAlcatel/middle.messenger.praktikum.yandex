import { Block } from "../../utils/block";
import avatarTemplate from "bundle-text:./avatar.hbs";
import styles from "./avatar.module.scss";

class Avatar extends Block<any> {
  constructor(props: any) {
    super(props);
  }

  protected render() {
    return this.compile(avatarTemplate, { ...this.props, styles });
  }
}

export { Avatar };
