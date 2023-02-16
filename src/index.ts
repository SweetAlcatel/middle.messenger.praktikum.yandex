import { ProfilePage } from "./pages/profile/profile";
import { SignInPage } from "./pages/signIn/signIn";
import { SignUpPage } from "./pages/signUp/signUp";
import { ChatPage } from "./pages/chats/chats";
import { authInstance } from "./controllers/authController";
import { Router } from "./utils/router";
import { ChangeDataProfilePage } from "./pages/changeDataProfile/changeDataProfile";
import { ChangePasswordProfile } from "./pages/changePasswordProfile/changePasswordProfile";

export const router = new Router(".root");

window.addEventListener("DOMContentLoaded", async () => {
  router
    .use("/", SignInPage)
    .use("/signUp", SignUpPage)
    .use("/profile", ProfilePage)
    .use("/chats", ChatPage)
    .use("/changeData", ChangeDataProfilePage)
    .use("/changePassword", ChangePasswordProfile)
    .start();

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case "/":
    case "/signUp":
      isProtectedRoute = false;
      break;
  }

  try {
    await authInstance.fetchUser();

    router.start();

    if (!isProtectedRoute) {
      router.go("/profile");
    }
  } catch (e) {
    router.start();

    if (isProtectedRoute) {
      router.go("/");
    }
  }
});
