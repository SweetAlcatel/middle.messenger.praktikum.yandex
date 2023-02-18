import { Block } from "../../utils/Block";
import template from "./button.hbs";
import styles from "./styles.module.scss";

interface IButtonProps {
  label: string;
  width?: number;
  id?: number;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const DEFAULT_WIDTH = 120;

export class Button extends Block {
  constructor({ label, onClick, onFocus, onBlur, width, id }: IButtonProps) {
    super({
      label,
      width: width || DEFAULT_WIDTH,
      id,
      events: {
        click: onClick,
        focus: onFocus,
        blur: onBlur,
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
