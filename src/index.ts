import { ProfilePage } from "./pages/profile/profile";
import { SignInPage } from "./pages/signIn/signIn";
import { SignUpPage } from "./pages/signUp/signUp";
import { Router } from "./utils/router";

export const router = new Router(".root");

router
  .use("/", SignInPage)
  .use("/signUp", SignUpPage)
  .use("/profile", ProfilePage)
  .start();
