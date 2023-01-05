import Handlebars from "handlebars";
import allPagesHTML from "bundle-text:./allPages.hbs";

export const AllPages = () => {
  const compile = Handlebars.compile(allPagesHTML);
  const resultPage = compile();

  return resultPage;
};
