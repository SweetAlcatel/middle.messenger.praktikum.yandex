import Handlebars from "handlebars";
import profileHTML from "bundle-text:./profile.hbs";

export const ProfilePage = () => {
  const compile = Handlebars.compile(profileHTML);
  const resultPage = compile({
    name: "Дима",
  });

  return resultPage;
};
