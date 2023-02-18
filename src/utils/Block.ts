import { EventBus } from "./EventBus";
import { v4 as uuidv4 } from "uuid";

export class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  public id: string = uuidv4();
  protected props: P;
  protected children: Record<string, Block>;
  private _element: HTMLElement | null = null;

  private eventBus: () => EventBus;

  constructor(propsWithChildren: P) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.props = this._makePropsProxy(props);
    this.children = children;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(_oldProps: P, _newProps: P) {
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _getChildrenAndProps(childrenAndProps: P) {
    const props: P = {} as P;
    const children: Record<string, Block> = {};

    if (childrenAndProps) {
      Object.entries(childrenAndProps).forEach(
        ([key, value]: [keyof P, any]) => {
          if (value instanceof Block) {
            children[key as string] = value;
          } else {
            props[key] = value;
          }
        }
      );
    }

    return {
      props,
      children,
    };
  }

  private _addEvents() {
    const { events = {} } = this.props as P & {
      events: Record<string, () => void>;
    };

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  private _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    this._element?.replaceWith(newElement);
    this._element = newElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent() {
    return this.element;
  }

  protected compile(template: (context: any) => string, context: object) {
    const contextAndStubs = { ...context };

    const html = template(contextAndStubs);
    const temp = document.createElement("template");

    temp.innerHTML = html;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
      if (!stub) return;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      stub.replaceWith(component.getContent()!);
    });

    return temp.content;
  }

  private _makePropsProxy = (props: P) => {
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldTarget = { ...target };

        target[prop as keyof P] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  };

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}

export default Block;
