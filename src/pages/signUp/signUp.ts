import signUpHTML from "./signUp.hbs";
import { parserHTMLFromString } from "../../utils/domParcer";

export const SignUpPage = () => {
  const page = signUpHTML();

  const doc = parserHTMLFromString(page);

  const emailInput = doc.getElementById("email");
  const loginInput = doc.getElementById("login");
  const firstNameInput = doc.getElementById("first_name");
  const secondNameInput = doc.getElementById("second_name");
  const passwordInput = doc.getElementById("password");
  const passwordAgainInput = doc.getElementById("passwordAgain");
  const phoneInput = doc.getElementById("phone");

  console.log(emailInput);
  emailInput.addEventListener("change", () => {
    console.log("kek");
  });

  return page;
};
