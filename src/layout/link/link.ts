import { Block } from "../../utils/block";
import linkTemplate from "bundle-text:./link.hbs";
import styles from "./link.module.scss";
import { withRouter, PropsWithRouter } from "../../utils/withRouter";

interface LinkProps extends PropsWithRouter {
  to: string;
  label: string;
  events?: {
    click: () => void;
  };
}

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
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
    return this.compile(linkTemplate, { ...this.props, styles });
  }
}

export const Link = withRouter(BaseLink);
