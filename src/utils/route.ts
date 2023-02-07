import { render } from "./render";
import { isEqual } from "./isEqual";
import { Block } from "./block";

class Route {
  _pathname: string;
  _blockClass: any;
  _block: any;
  _props: any;

  constructor(pathname: string, view: Block, props: {}) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: any) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export { Route };
