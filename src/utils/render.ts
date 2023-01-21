import { FixMeLater } from "../types/index";

export function render(query: FixMeLater, block: FixMeLater) {
  const root = document.querySelector(query);

  // Можно завязаться на реализации вашего класса Block
  root.appendChild(block.getContent());

  // block.dispatchComponentDidMount();

  return root;
}
