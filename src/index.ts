import { AllPages } from "./pages/allPages/allPages";
import { ChangeDataProfilePage } from "./pages/changeDataProfile/changeDataProfile";
import { ChangePasswordProfilePage } from "./pages/changePasswordProfile/changePasswordProfile";
import { Chats } from "./pages/chats/chats";
import { Router } from "./utils/router";
import { ClientErrorPage, ServerErrorPage } from "./pages/error/error";
import { ProfilePage } from "./pages/profile/profile";
import { SignInPage } from "./pages/signIn/signIn";
import { SignUpPage } from "./pages/signUp/signUp";

const router = new Router(".root");

router
  .use("/", AllPages)
  .use("/changeData", ChangeDataProfilePage)
  .use("/changePassword", ChangePasswordProfilePage)
  .use("/chats", Chats)
  .use("/404", ClientErrorPage)
  .use("/500", ServerErrorPage)
  .use("/profile", ProfilePage)
  .use("/signIn", SignInPage)
  .use("/signUp", SignUpPage)
  .start();
