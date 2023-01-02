import { ClientErrorPage } from "./pages/error/error";
import { SignInPage } from "./pages/signIn/signIn";
import { SignUpPage } from "./pages/signUp/signUp";
import { ChatsPage } from "./pages/chats/chats";

console.log("entry point");

document.getElementById("root").innerHTML = ChatsPage();
