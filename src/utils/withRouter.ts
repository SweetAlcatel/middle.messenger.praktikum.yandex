import { Router } from "./router";
import { Block } from "./block";
import { FixMeLater } from "../types";

export function withRouter(Component: typeof Block<any>) {
  return class WithRouter extends Component {
    constructor(props: FixMeLater & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}

export interface PropsWithRouter {
  router: typeof Router;
}
