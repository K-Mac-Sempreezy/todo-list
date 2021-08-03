import { createAddTaskMenu } from './menu-add-task.js';
import { createInboxMenu } from './menu-inbox.js';
import { createNextSevenMenu } from './menu-next-seven.js';
import { createTodayMenu } from './menu-today.js';

const createMenu = () => {
  const menu = createMenuElement();
  const menuItems = createMenuItemsContainer();

  menuItems.appendChild(createAddTaskMenu());
  menuItems.appendChild(createInboxMenu());
  menuItems.appendChild(createTodayMenu());
  menuItems.appendChild(createNextSevenMenu());
  menu.appendChild(menuItems);
  return menu;
};

const createMenuElement = () => {
  const menu = document.createElement('div');
  menu.setAttribute('id', 'menu');
  return menu;
};

const createMenuItemsContainer = () => {
  const menuItems = document.createElement('div');
  menuItems.setAttribute('id', 'menu-items-container');
  return menuItems;
};

const updateMenu = (e) => {
  const id = e.target.id;
  console.log(id)
  const menu = document.getElementById('')
}

export { createMenu, updateMenu };
