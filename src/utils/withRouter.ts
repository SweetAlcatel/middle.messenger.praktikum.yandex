import Router from "./router";
import { Block } from "./block";
import { FixMeLater } from "../types";

export function withRouter(Component: typeof Block<any>) {
  type Props = typeof Component extends typeof Block<FixMeLater>
    ? FixMeLater
    : any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}

export interface PropsWithRouter {
  router: typeof Router;
}
