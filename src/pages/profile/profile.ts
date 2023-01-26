import profileTemplate from "bundle-text:./profile.hbs";
import { Block } from "../../utils/block";

interface IProfilePage {}

class ProfilePage extends Block {
  constructor(props: IProfilePage) {
    super("div", props);
  }

  render() {
    return this.compile(profileTemplate, { ...this.props });
  }
}

export const profilePage = new ProfilePage({
  name: "Dima",
});
