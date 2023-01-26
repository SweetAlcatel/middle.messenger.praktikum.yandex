import { EventBus } from "./eventBus";
import { v4 as makeUUID } from "uuid";
import Handlebars from "handlebars";
import { Children, FixMeLater, Nullable, Props } from "../types/index";

interface IBlock {
  props: Props;
  children: Children;
  eventBus: () => EventBus;
  id: Nullable<string>;
}

class Block implements IBlock {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _id: Nullable<string> = null;
  _element: Nullable<HTMLElement> = null;
  _meta: Nullable<{ tagName: string; props: Props }> = null;
  props; // прокси-объект свойств
  children;
  eventBus;

  constructor(tagName = "div", propsAndChildren = {}) {
    const eventBus = new EventBus();

    const { children, props } = this._getChildren(propsAndChildren);

    this._meta = {
      tagName,
      props,
    };

    this._id = makeUUID();

    this.children = children;

    this.props = this._makePropsProxy({ ...props, __id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  public get id() {
    return this._id;
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    this._element = this._createDocumentElement(this._meta!.tagName);
  }

  public init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this.componentDidMount();

    // пока комментарий, надо бы разобраться
    // Object.values(this.children).forEach((child) => {
    //   child.dispatchComponentDidMount();
    // });
  }

  //@ts-ignore
  componentDidMount(oldProps?: any) {}

  private _componentDidUpdate(oldProps: FixMeLater, newProps: FixMeLater) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  //@ts-ignore
  public componentDidUpdate(oldProps: FixMeLater, newProps: FixMeLater) {
    return true;
  }

  public setProps = (nextProps: FixMeLater) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();

    // this._removeEvents();
    this._element!.innerHTML = ""; // удаляем предыдущее содержимое

    this._element?.appendChild(block as DocumentFragment);

    this._addEvents();
  }

  // определяется пользователем
  protected render(): DocumentFragment | void {}

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: Props) {
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute("data-id", this._id as string);
    return element;
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element &&
        this._element.addEventListener(eventName, events[eventName]);
    });
  }

  private _getChildren(propsAndChildren: Children) {
    const children: Children = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  public compile(template: string, props?: Props) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    const comp = Handlebars.compile(template);

    const result = comp({ ...propsAndStubs });

    fragment.innerHTML = result;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      stub?.replaceWith(child.getContent() as Node);
    });

    return fragment.content;
  }
}

export { Block };
