import { ClientErrorPage } from "./pages/error/error";
import { SignInPage } from "./pages/signIn/signIn";
import { SignUpPage } from "./pages/signUp/signUp";
import { ChatsPage } from "./pages/chats/chats";
import { ProfilePage } from "./pages/profile/profile";
import { ChangeDataProfilePage } from "./pages/changeDataProfile/changeDataProfile";
import { ChangePasswordProfilePage } from "./pages/changePasswordProfile/changePasswordProfile";

console.log("entry point");

document.getElementById("root").innerHTML = ChangePasswordProfilePage();
