import { Router } from "./router";
import { Block } from "./block";
import { FixMeLater } from "../types";

export function withRouter(Component: typeof Block<FixMeLater>) {
  type Props = typeof Component extends typeof Block<FixMeLater>
    ? FixMeLater
    : FixMeLater;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}

export interface PropsWithRouter {
  router: typeof Router;
}
