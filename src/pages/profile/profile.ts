import profileTemplate from "bundle-text:./profile.hbs";
import { Block } from "../../utils/block";

export class ProfilePage extends Block {
  props = {
    name: "Dima",
  };

  constructor() {
    super("div");
  }

  render() {
    return this.compile(profileTemplate, { ...this.props });
  }
}
