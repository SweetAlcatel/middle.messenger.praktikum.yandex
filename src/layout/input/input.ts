import inputTemplate from "bundle-text:./input.hbs";
import { Block } from "../../utils/block";

interface IInput {
  value?: string;
  type: string;
  name: string;
  id: string;
  events: {
    [key: string]: (payload: any) => void;
  };
  pattern?: string;
  placeholder?: string;
}

export class Input extends Block {
  constructor(props: IInput) {
    super("input", props);
  }

  render() {
    return this.compile(inputTemplate, { ...this.props });
  }
}
