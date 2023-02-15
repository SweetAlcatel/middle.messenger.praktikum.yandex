import { FixMeLater } from "../types";
import { Block } from "./block";
import { isEqual } from "./isEqual";
import { render } from "./render";

class Route {
  private block: Block | null = null;

  constructor(
    private pathname: string | FixMeLater,
    private readonly blockClass: FixMeLater,
    private readonly query: string
  ) {}

  leave() {
    this.block = null;
  }

  match(pathname: string | FixMeLater) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({});

      render(this.query, this.block);
      return;
    }
  }
}

export { Route };
