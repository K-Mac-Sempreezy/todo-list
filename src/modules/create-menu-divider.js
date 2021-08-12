import { createElement } from "./create-element.js";

const createMenuDivideLine = () => {
  const menuDividerLine = createElement('div', {
    id: ``,
    class: 'menu-divide-line',
  });
  return menuDividerLine;
};

export { createMenuDivideLine };