import Handlebars from "handlebars";
import chatsHTML from "bundle-text:./chats.hbs";

export const ChatsPage = () => {
  const compile = Handlebars.compile(chatsHTML);
  const resultPage = compile({
    name: "Владимир",
    isChat: true,
  });

  return resultPage;
};
