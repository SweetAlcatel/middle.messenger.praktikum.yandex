import inputTemplate from "bundle-text:./input.hbs";
import { Block } from "../../utils/block";
import styles from "./input.module.scss";

interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  events?: Record<string, any>;
  pattern?: string;
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  public setValue(value: string) {
    return ((this.element as HTMLInputElement).value = value);
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(inputTemplate, { ...this.props, styles });
  }
}
