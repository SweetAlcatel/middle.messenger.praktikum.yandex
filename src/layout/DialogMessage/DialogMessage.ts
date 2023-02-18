import template from "./dialogMessage.hbs";
import { Block } from "../../utils/Block";
import { IMessage } from "../../api/interfaces";
import { formatDate } from "../../utils/FormatDate";
import store from "../../utils/Store";

export class DialogMessage extends Block {
  constructor(props: IMessage) {
    super({ ...props });
  }

  render() {
    const formatTime = formatDate(this.props.time).time;
    const users = store.getState().usersInChat;
    const user = store.getState().user;

    const isMyMessage = user.id === this.props.userId;
    const authorMessage = users.find((user) => user.id === this.props.userId);
    const displayName = authorMessage?.display_name || authorMessage?.first_name;

    return this.compile(template, {
      ...this.props,
      time: formatTime,
      author: displayName,
      isMyMessage,
      children: this.children,
    });
  }
}
