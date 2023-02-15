import { FixMeLater } from "../types";
import store from "../utils/store";
import { Websocket, WebsocketEvents } from "../utils/websocket";

export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}

class MessageController {
  private sockets: Map<number, FixMeLater> = new Map();

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) {
      return;
    }

    const userId = store.getState().user.id;

    const wsTransport = new Websocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`
    );

    this.sockets.set(id, wsTransport);

    await wsTransport.connect();

    this.subscribe(wsTransport, id);
    this.fetchOldMessages(id);
  }

  sendMessage(id: number, message: string) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({
      type: "message",
      content: message,
    });
  }

  fetchOldMessages(id: number) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({ type: "get old", content: "0" });
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  private onMessage(id: number, messages: Message | Message[]) {
    let messagesToAdd: Message[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (store.getState().messages || {})[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    store.set(`messages.${id}`, messagesToAdd);
  }

  private onClose(id: number) {
    this.sockets.delete(id);
  }

  private subscribe(transport: FixMeLater, id: number) {
    transport.on(WebsocketEvents.Message, (message: FixMeLater) =>
      this.onMessage(id, message)
    );
    transport.on(WebsocketEvents.Close, () => this.onClose(id));
  }
}

export const messageInstance = new MessageController();
