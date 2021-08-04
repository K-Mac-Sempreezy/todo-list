import { createAddTaskMenu } from './menu-add-task.js';
import { createInboxMenu } from './menu-inbox.js';
import { createNextSevenMenu } from './menu-next-seven.js';
import { createTodayMenu } from './menu-today.js';
import { currentPageView } from './edit-task.js';

const createMenu = () => {
  const menu = createMenuElement();
  const menuItems = createMenuItemsContainer();

  menuItems.appendChild(createAddTaskMenu());
  menuItems.appendChild(createInboxMenu());
  menuItems.appendChild(createTodayMenu());
  menuItems.appendChild(createNextSevenMenu());
  menu.appendChild(menuItems);
  updateMenu();
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
  const inboxLabel = document.getElementById('menu-inbox-label');
  const todayLabel = document.getElementById('menu-today-label');
  const next7Label = document.getElementById('menu-seven-label');

  if (e.target.id === 'inbox-container') {
    inboxLabel.style.fontWeight = '700';
    todayLabel.style.fontWeight = '300';
    next7Label.style.fontWeight = '300';
    currentPageView = 'inbox';
  } else if (e.target.id === 'today-container') {
    inboxLabel.style.fontWeight = '300';
    todayLabel.style.fontWeight = '700';
    next7Label.style.fontWeight = '300';
    currentPageView = 'today';
  } else if (e.target.id === 'next-seven-container') {
    inboxLabel.style.fontWeight = '300';
    todayLabel.style.fontWeight = '300';
    next7Label.style.fontWeight = '700';
    currentPageView = 'next-seven';
  }
};

export { createMenu, updateMenu };
