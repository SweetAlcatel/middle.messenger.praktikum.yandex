import { Block } from "../../utils/Block";
import template from "./avatar.hbs";
import styles from "./styles.module.scss";
import { API_URL } from "../../utils/HTTPTransport";
import { RESOURCES_PATH } from "../../api/ResourcesAPI";

interface IAvatarProps {
  path: string;
  width: number;
  height: number;
}

export class Avatar extends Block<IAvatarProps> {
  constructor(props: IAvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      path: `${API_URL}/${RESOURCES_PATH}${this.props.path}`,
      styles,
    });
  }
}
