import Handlebars from "handlebars";
import errorHTML from "bundle-text:./error.hbs";

export const ClientErrorPage = () => {
  const compile = Handlebars.compile(errorHTML);
  const resultPage = compile({
    errorCode: "404",
    errorMessage: "Вы не туда попали",
  });

  return resultPage;
};

export const ServerErrorPage = () => {
  const compile = Handlebars.compile(errorHTML);
  const resultPage = compile({
    errorCode: "500",
    errorMessage: "Мы уже фиксим",
  });

  return resultPage;
};
