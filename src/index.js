import { AllPages } from "./pages/allPages/allPages";
import { ClientErrorPage, ServerErrorPage } from "./pages/error/error";
import { SignUpPage } from "./pages/signUp/signUp";
import { SignInPage } from "./pages/signIn/signIn";
import { ProfilePage } from "./pages/profile/profile";
import { ChangeDataProfilePage } from "./pages/changeDataProfile/changeDataProfile";
import { ChangePasswordProfilePage } from "./pages/changePasswordProfile/changePasswordProfile";
import { ChatsPage } from "./pages/chats/chats";

const root = document.getElementById("root");

root.innerHTML = AllPages();

switch (window.location.pathname) {
  case "/404":
    root.innerHTML = ClientErrorPage();
    break;
  case "/500":
    root.innerHTML = ServerErrorPage();
    break;
  case "/registration":
    root.innerHTML = SignUpPage();
    break;
  case "/login":
    root.innerHTML = SignInPage();
    break;
  case "/chats":
    root.innerHTML = ChatsPage();
    break;
  case "/profile":
    root.innerHTML = ProfilePage();
    break;
  case "/changeData":
    root.innerHTML = ChangeDataProfilePage();
    break;
  case "/changePassword":
    root.innerHTML = ChangePasswordProfilePage();
    break;
  default:
    root.innerHTML = AllPages();
    break;
}
