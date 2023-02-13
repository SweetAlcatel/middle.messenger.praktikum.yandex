import { SignInPage } from "./pages/signIn/signIn";
import { SignUpPage } from "./pages/signUp/signUp";
import { Router } from "./utils/router";

const router = new Router(".root");

router.use("/", SignInPage).use("/signUp", SignUpPage).start();
