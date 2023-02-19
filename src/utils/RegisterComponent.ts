import * as Handlebars from "handlebars/dist/handlebars.runtime";
import { HelperOptions } from "handlebars";

import { Block } from "./Block";

export function registerComponent(name: string, Component: typeof Block) {
  Handlebars.registerHelper(name, ({ hash, data }: HelperOptions) => {
    const component = new Component(hash);

    if (!data.root.children) {
      data.root.children = {};
    }

    data.root.children[component.id] = component;

    return `<div data-id="${component.id}"></div>`;
  });
}
