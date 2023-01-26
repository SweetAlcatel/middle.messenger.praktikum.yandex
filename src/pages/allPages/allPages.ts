import allPagesTemplate from "bundle-text:./allPages.hbs";
import { Block } from "../../utils/block";

interface IAllPages {}

class AllPages extends Block {
  constructor(props: IAllPages) {
    super("div", props);
  }

  render() {
    return this.compile(allPagesTemplate, { ...this.props });
  }
}

export const allPages = new AllPages({});
