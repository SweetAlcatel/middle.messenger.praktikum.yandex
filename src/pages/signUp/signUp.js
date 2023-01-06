import Handlebars from "handlebars";
import signUpHTML from "bundle-text:./signUp.hbs";

export const SignUpPage = () => {
  const compile = Handlebars.compile(signUpHTML);
  const resultPage = compile();

  return resultPage;
};
