import errorHTML from "./error.hbs";

export const ClientErrorPage = () => {
  return errorHTML({
    errorCode: "400",
    errorMessage: "Вы не туда попали",
  });
};

export const ServerErrorPage = () => {
  return errorHTML({
    errorCode: "500",
    errorMessage: "Мы уже фиксим",
  });
};
