import template from "./notice.hbs";
import styles from "./styles.module.scss";
import { Block } from "../../utils/Block";

interface INoticeProps {
  text: string;
  error: string;
  success: string;
}

export class Notice extends Block<INoticeProps> {
  constructor(props: INoticeProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
