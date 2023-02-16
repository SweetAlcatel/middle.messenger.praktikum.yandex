import { Block } from "../../utils/block";
import template from "bundle-text:./button.hbs";
import styles from "./button.module.scss";

interface ButtonProps {
  type?: string;
  text: string;
  events: {
    click: () => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: "button", ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
