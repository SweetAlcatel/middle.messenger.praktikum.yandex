import { ClientErrorPage } from "./pages/error/error";
import { SignInPage } from "./pages/signIn/signIn";
import { SignUpPage } from "./pages/signUp/signUp";

console.log("entry point");

document.getElementById("root").innerHTML = SignUpPage();
