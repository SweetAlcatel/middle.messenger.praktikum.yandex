import template from "./link.hbs";
import styles from "./styles.module.scss";
import { PropsWithRouter, withRouter } from "../../hocs/withRouter";
import { Block } from "../../utils/Block";

export interface ILinkProps extends PropsWithRouter {
  to: string;
  label: string;
  events?: {
    click: () => void;
  };
}

class BaseLink extends Block<ILinkProps> {
  constructor(props: ILinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const Link = withRouter(BaseLink);
