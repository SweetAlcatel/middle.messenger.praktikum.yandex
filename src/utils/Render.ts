import { Block } from "./Block";

export function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root по селектору ${query} не найден`);
  }

  root.innerHTML = "";

  root.append(block.getContent()!);

  return root;
}
