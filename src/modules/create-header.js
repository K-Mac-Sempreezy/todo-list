import { createElement } from './create-element.js';

const createHeader = () => {
  const header = createElement('header', {
    id: 'header',
  });

  const logo = createElement('h3', {
    id: 'header-logo',
  });

  logo.textContent = 'todo-it';

  header.appendChild(logo);

  return header;
};

export { createHeader };