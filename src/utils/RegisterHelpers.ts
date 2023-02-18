import * as Handlebars from "handlebars/dist/handlebars.runtime";

export const registerHelpers = () => {
  Handlebars.registerHelper("isTrue", function (value: any) {
    return value === true;
  });
};
