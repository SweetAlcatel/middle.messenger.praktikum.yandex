import { Block } from "../../utils/block";
import iconTemplate from "bundle-text:./icon.hbs";

interface IconProps {
  type?: string;
  class?: string;
  url: string;
  events?: {
    click: () => void;
  };
}

class Icon extends Block<IconProps> {
  constructor(props: IconProps) {
    super({ type: "icon", ...props });
  }

  render() {
    return this.compile(iconTemplate, { ...this.props });
  }
}

export { Icon };
