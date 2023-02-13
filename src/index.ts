import { SignInPage } from "./pages/signIn/signIn";
import { Router } from "./utils/router";

const router = new Router(".root");

router.use("/", SignInPage).start();
