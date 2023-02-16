import { EventBus } from "./eventBus";

export enum WebsocketEvents {
  Connected = "connected",
  Error = "error",
  Message = "message",
  Close = "close",
}

class Websocket extends EventBus {
  private socket: WebSocket | null = null;
  private pingInterval: number = 0;

  constructor(private url: string) {
    super();
  }

  public send(data: any) {
    this.socket?.send(JSON.stringify(data));
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: "ping" });
    }, 5000);

    this.on(WebsocketEvents.Close, () => {
      clearInterval(this.pingInterval);

      this.pingInterval = 0;
    });
  }

  public connect() {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(WebsocketEvents.Connected, () => {
        resolve();
      });
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener("open", () => {
      this.emit(WebsocketEvents.Connected);
    });
    socket.addEventListener("close", () => {
      this.emit(WebsocketEvents.Close);
    });

    socket.addEventListener("error", (e) => {
      this.emit(WebsocketEvents.Error, e);
    });

    socket.addEventListener("message", (message) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === "pong") {
        return;
      }

      this.emit(WebsocketEvents.Message, data);
    });
  }
}

export { Websocket };
