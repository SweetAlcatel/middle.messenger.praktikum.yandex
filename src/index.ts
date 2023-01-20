import { render } from "./utils/render";
import { signUpPage } from "./pages/signUp/signUp";
import { signInPage } from "./pages/signIn/signIn";
import { clientErrorPage, serverErrorPage } from "./pages/error/error";
import { profilePage } from "./pages/profile/profile";
import { chatsPage } from "./pages/chats/chats";
import { changePasswordProfilePage } from "./pages/changePasswordProfile/changePasswordProfile";
import { changeDataProfilePage } from "./pages/changeDataProfile/changeDataProfile";
import { allPages } from "./pages/allPages/allPages";

switch (window.location.pathname) {
  case "/404":
    render(".root", clientErrorPage);
    break;
  case "/500":
    render(".root", serverErrorPage);
    break;
  case "/registration":
    render(".root", signUpPage);
    console.log(
      new FormData(document.querySelector("form") as HTMLFormElement)
    );
    break;
  case "/login":
    render(".root", signInPage);
    break;
  case "/chats":
    render(".root", chatsPage);
    break;
  case "/profile":
    render(".root", profilePage);
    break;
  case "/changeData":
    render(".root", changeDataProfilePage);
    break;
  case "/changePassword":
    render(".root", changePasswordProfilePage);
    break;
  default:
    render(".root", allPages);
    break;
}
