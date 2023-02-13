import { FixMeLater } from "../../types";
import { Block } from "../../utils/block";
import linkTemplate from "bundle-text:./link.hbs";
import styles from "./link.module.scss";
import { withRouter } from "../../utils/withRouter";

class BaseLink extends Block<FixMeLater> {
  constructor(props: FixMeLater) {
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
