import { Block } from "../../utils/Block";
import template from "./info.hbs";

interface IInfoProps {
  param: string;
  value: string;
}

export class Info extends Block<IInfoProps> {
  constructor({ param, value }: IInfoProps) {
    super({
      param,
      value,
    });
  }

  render() {
    return this.compile(template, {
      param: this.props.param,
      value: this.props.value,
    });
  }
}
