import chatsHTML from "./chats.hbs";

export const ChatsPage = () => {
  return chatsHTML({
    name: "Владимир",
    isChat: true,
  });
};
