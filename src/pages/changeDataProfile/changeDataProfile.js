import Handlebars from "handlebars";
import changeDataProfileHTML from "bundle-text:./changeDataProfile.hbs";

export const ChangeDataProfilePage = () => {
  const compile = Handlebars.compile(changeDataProfileHTML);
  const resultPage = compile();

  return resultPage;
};
