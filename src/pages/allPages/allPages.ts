import allPagesTemplate from "bundle-text:./allPages.hbs";
import { Block } from "../../utils/block";

class AllPages extends Block {
  constructor() {
    super("div");
  }

  render() {
    return this.compile(allPagesTemplate, { ...this.props });
  }
}

export { AllPages };
