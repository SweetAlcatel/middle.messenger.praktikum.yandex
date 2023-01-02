import Handlebars from "handlebars";
import loginHTML from "bundle-text:./signIn.hbs";

export const SignInPage = () => {
  const compile = Handlebars.compile(loginHTML);
  const resultPage = compile();

  return resultPage;
};
