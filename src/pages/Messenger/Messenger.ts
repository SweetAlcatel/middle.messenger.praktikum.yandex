import { Block } from "../../utils/Block";
import template from "./messenger.hbs";
import styles from "./styles.module.scss";
import ChatController from "../../controllers/ChatController";
import { getFormData } from "../../helpers/getFormData";
import { withStore } from "../../utils/Store";
import { IChatInfo } from "../../api/interfaces";

class MessengerPageBase extends Block {
  init() {
    ChatController.fetchChats({});
  }

  handleShowCreateForm = () => {
    this.setProps({ activeChat: "" });
  };

  handleCreateChat = (e: Event) => {
    e.preventDefault();
    const { title } = getFormData();

    ChatController.createChat(title);
  };

  handleSearch = (e: Event) => {
    e.preventDefault();
    const input = document.getElementById("search-chat") as HTMLInputElement;

    if (input) {
      const value = input.value;
      ChatController.fetchChats({ title: value });
    }
  };

  handleShowUsersForm = () => {
    this.setProps({ showCreateForm: "", showUsersForm: "show" });
  };

  handleHideUsersForm = (e: Event) => {
    e.preventDefault();
    this.setProps({ showCreateForm: "", showUsersForm: "" });
  };

  render() {
    const activeChat = (this.props.chats || []).find(
      (chat: IChatInfo) => chat.id === this.props.activeChat
    );
    const title = activeChat?.title;

    return this.compile(template, {
      ...this.props,
      children: this.children,
      onShowCreateForm: this.handleShowCreateForm,
      createChat: this.handleCreateChat,
      onSearch: this.handleSearch,
      onShowUsersForm: this.handleShowUsersForm,
      onHideUsersForm: this.handleHideUsersForm,
      activeChatTitle: title,
      styles,
    });
  }
}

const withChats = withStore((state) => {
  return {
    chats: [...(state.chats || [])],
    messages: [...(state.messages || [])],
    activeChat: state.activeChat,
    searchChatText: state.searchChatText,
  };
});

export const MessengerPage = withChats(MessengerPageBase);
