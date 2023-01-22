import inputTemplate from "bundle-text:./input.hbs";
import { Block } from "../../utils/block";

export class Input extends Block {
  constructor(props) {
    super("input", props);
  }

  render() {
    return this.compile(inputTemplate, { ...this.props });
  }
}
