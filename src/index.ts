import { ProfilePage } from "./pages/profile/profile";
import { SignInPage } from "./pages/signIn/signIn";
import { SignUpPage } from "./pages/signUp/signUp";
import { ChatPage } from "./pages/chats/chats";
import AuthController from "./controllers/authController";
import Router from "./utils/router";
import { ChangeDataProfile } from "./pages/changeDataProfile/changeDataProfile";
import { ChangePasswordProfile } from "./pages/changePasswordProfile/changePasswordProfile";

enum Routes {
  Index = "/",
  Register = "/signUp",
  Profile = "/profile",
  EditProfile = "/changeData",
  Password = "/changePassword",
  Chats = "/chats",
  Error404 = "/404",
  Error500 = "/500",
}

window.addEventListener("DOMContentLoaded", async () => {
  Router.use(Routes.Index, SignInPage)
    .use(Routes.Register, SignUpPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.EditProfile, ChangeDataProfile)
    .use(Routes.Password, ChangePasswordProfile)
    .use(Routes.Chats, ChatPage)
    .start();

  let isProtectedRoute = true;

  // eslint-disable-next-line default-case
  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = true;
      break;
  }
  try {
    await AuthController.fetchUser();
    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
