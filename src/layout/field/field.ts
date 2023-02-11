import { Block } from "../../utils/block";
import templateField from "bundle-text:./field.hbs";
import styles from "./field.module.scss";

interface FieldProps {
  name: string;
  value: string | number;
}

export class Field extends Block<FieldProps> {
  constructor(props: FieldProps) {
    super(props);
  }

  protected render() {
    return this.compile(templateField, { ...this.props, styles });
  }
}
