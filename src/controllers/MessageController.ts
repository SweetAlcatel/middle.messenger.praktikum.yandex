import store from "../utils/Store";

const CHAT_URL = "wss://ya-praktikum.tech/ws/chats/";

enum WebSockets {
  Open = "open",
  Message = "message",
  Error = "error",
  Close = "close",
  Ping = "ping",
  GetOld = "get old",
}

export interface IMessage {
  offset: number;
}

export interface IWebSocket {
  userId: number;
  chatId: number;
  token: string;
}

class MessageController {
  private _webSocket: WebSocket;
  private _chatId: number;
  private _userId: number;
  private _ping: any;
  private _token: string;

  private _addEventListeners() {
    this._webSocket.addEventListener(WebSockets.Open, this._handleOpen);
    this._webSocket.addEventListener(WebSockets.Close, this._handleClose);
    this._webSocket.addEventListener(WebSockets.Message, this._handleMassage);
    this._webSocket.addEventListener(WebSockets.Error, this._handleError);
  }

  private _removeEventListeners() {
    this._webSocket.removeEventListener(WebSockets.Open, this._handleOpen);
    this._webSocket.removeEventListener(WebSockets.Close, this._handleClose);
    this._webSocket.removeEventListener(
      WebSockets.Message,
      this._handleMassage
    );
    this._webSocket.removeEventListener(WebSockets.Error, this._handleError);
  }

  private readonly _handleMassage = (e: MessageEvent) => {
    const data = JSON.parse(e.data);

    if (Array.isArray(data)) {
      if (!data.length) {
        store.set("messages", []);
      } else if (data[0].id === 0) {
        store.set("messages", data);
      } else {
        const messages = [...data];

        store.set("messages", messages);
      }
    } else if (typeof data === "object" && data.type === "message") {
      const messages = [data, ...store.getState().messages];
      store.set("messages", messages);
    }

    console.log("Получены данные", e.data);
  };

  private readonly _handleOpen = () => {
    this.getMessages({ offset: 0 });
    this._ping = setInterval(() => {
      this._webSocket.send(
        JSON.stringify({
          type: WebSockets.Ping,
        })
      );
    }, 10000);
  };

  private readonly _handleError = (e: ErrorEvent) => {
    console.log(e.message);
  };

  private readonly _handleClose = (e: CloseEventInit) => {
    this._removeEventListeners();
    if (e.code === 1006) {
      this._reconnect();
    }

    if (e.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${e.code} | Причина: ${e.reason}`);
  };

  private _reconnect() {
    this.connect({
      token: this._token,
      userId: this._userId,
      chatId: this._chatId,
    });
  }

  public getMessages(options: IMessage) {
    this._webSocket.send(
      JSON.stringify({
        content: options.offset.toString(),
        type: WebSockets.GetOld,
      })
    );
  }

  public connect(options: IWebSocket) {
    this._chatId = options.chatId;
    this._userId = options.userId;
    this._token = options.token;

    this._webSocket = new WebSocket(
      `${CHAT_URL}${options.userId}/${options.chatId}/${options.token}`
    );

    this._addEventListeners();
  }

  public exit() {
    clearInterval(this._ping);
    this._webSocket.close();
    this._removeEventListeners();
  }

  public sendMessage(message: string) {
    this._webSocket.send(
      JSON.stringify({
        content: message,
        type: WebSockets.Message,
      })
    );
  }
}

export default new MessageController();
