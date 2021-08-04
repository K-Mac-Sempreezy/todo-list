import { updateMenu } from "./menu";
import { createTaskContent } from "./task";

const createNextSevenMenu = () => {
  const nextSevenContainer = createNextSevenContainer();
  const nextSevenIcon = createNextSevenIcon();
  const nextSevenLabel = createNextSevenLabel();

  nextSevenContainer.appendChild(nextSevenIcon);
  nextSevenContainer.appendChild(nextSevenLabel);

  nextSevenContainer.addEventListener('click', createTaskContent);
  nextSevenContainer.addEventListener('click', updateMenu);

  return nextSevenContainer;
};

const createNextSevenContainer = () => {
  const nextSevenContainer = document.createElement('div');
  nextSevenContainer.setAttribute('id', 'next-seven-container');
  nextSevenContainer.setAttribute('data-nav', 'next-seven');
  return nextSevenContainer;
};

const createNextSevenIcon = () => {
  const nextSevenIcon = document.createElement('div');
  nextSevenIcon.setAttribute('class', 'icon-menu');
  nextSevenIcon.setAttribute('id', 'next-seven-icon');
  return nextSevenIcon;
};

const createNextSevenLabel = () => {
  const nextSevenLabel = document.createElement('p');
  nextSevenLabel.setAttribute('id', 'menu-seven-label');
  nextSevenLabel.textContent = 'Next 7 Days';
  return nextSevenLabel;
};

export { createNextSevenMenu };
