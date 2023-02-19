import { ErrorPage } from "./pages/Error/Error";
import { SignInPage } from "./pages/signIn/signIn";
import { SignUpPage } from "./pages/signUp/signUp";
import { ProfilePage } from "./pages/Profile/Profile";
import { SettingsPage } from "./pages/Settings/Settings";
import { ProfileEditPassPage } from "./pages/ProfileEditPass/ProfileEditPass";
import { MessengerPage } from "./pages/Messenger/Messenger";

import AuthController from "./controllers/AuthController";

import Button from "./layout/Button";
import Input from "./layout/Input";
import Info from "./layout/Info";
import DialogInfo from "./layout/DialogInfo";
import LabelInput from "./layout/LabelInput";
import Link from "./layout/Link";
import Avatar from "./layout/Avatar";
import Notice from "./layout/Notice";
import DialogHeader from "./layout/DialogHeader";
import Dialog from "./layout/Dialog";
import Users from "./layout/Users";
import DialogMessage from "./layout/DialogMessage";

import Router from "./utils/Router";
import store from "./utils/Store";
import { registerComponent } from "./utils/RegisterComponent";
import { registerHelpers } from "./utils/RegisterHelpers";

import "../public/static/globals.scss";

registerComponent("Button", Button as any);
registerComponent("Input", Input as any);
registerComponent("Info", Info as any);
registerComponent("DialogInfo", DialogInfo as any);
registerComponent("LabelInput", LabelInput as any);
registerComponent("Link", Link as any);
registerComponent("Avatar", Avatar as any);
registerComponent("Notice", Notice as any);
registerComponent("DialogHeader", DialogHeader as any);
registerComponent("Dialog", Dialog as any);
registerComponent("Users", Users as any);
registerComponent("DialogMessage", DialogMessage as any);
registerHelpers();

(window as any).store = store;

const authRedirectPaths = ["/", "/login"];

window.addEventListener("DOMContentLoaded", async () => {
  Router.use("/", SignInPage)
    .use("/login", SignInPage)
    .use("/signup", SignUpPage)
    .use("/profile", ProfilePage)
    .use("/settings", SettingsPage)
    .use("/404", ErrorPage)
    .use("/messenger", MessengerPage)
    .use("/profileEditPass", ProfileEditPassPage);

  const authUser = await AuthController.fetchUser();

  if (authUser) {
    Router.start();

    if (authRedirectPaths.includes(window.location.pathname)) {
      Router.go("/messenger");
    }
  } else {
    Router.start();
    Router.go("/login");
  }
});
