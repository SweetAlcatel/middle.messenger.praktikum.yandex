import allPagesTemplate from "bundle-text:./allPages.hbs";
import { Block } from "../../utils/block";

class AllPages extends Block {
  constructor(props) {
    super("div", props);
  }

  render() {
    return this.compile(allPagesTemplate, { ...this.props });
  }
}

export const allPages = new AllPages({});
