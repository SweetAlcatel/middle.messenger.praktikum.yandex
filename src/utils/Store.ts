import { set } from "../helpers/set";
import { EventBus } from "./EventBus";
import { Block } from "./Block";
import { isEqualObject } from "./IsEqualObject";
import { IChatInfo, IChatUsers, IMessage, IUser } from "../api/interfaces";

enum StoreEvents {
  UPDATED = "updated",
}

interface IState {
  user: IUser;
  chats: IChatInfo[];
  activeChat: number | null;
  searchChatText: string;
  searchUserText: string;
  users: IChatUsers[];
  usersInChat: IChatUsers[];
  messages: IMessage[];
}

export class Store extends EventBus {
  private state: IState = {} as IState;

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.UPDATED, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: any) => any) {
  return function wrap(Component: typeof Block) {
    let prevState: any;

    return class WithStore extends Component {
      constructor(props: any) {
        prevState = mapStateToProps(store.getState());

        super({ ...props, ...prevState });

        store.on(StoreEvents.UPDATED, () => {
          const stateProps = mapStateToProps(store.getState());

          if (isEqualObject(prevState, stateProps)) {
            return;
          }
          prevState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}

export default store;
