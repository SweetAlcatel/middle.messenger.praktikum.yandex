import Handlebars from "handlebars";
import changePasswordProfileHTML from "bundle-text:./changePasswordProfile.hbs";

export const ChangePasswordProfilePage = () => {
  const compile = Handlebars.compile(changePasswordProfileHTML);
  const resultPage = compile();

  return resultPage;
};
