import { createAddTaskForm } from './add-task-form.js';
import { createInboxMenu } from './menu-inbox.js';
import { createNextSevenMenu } from './menu-next-seven.js';
import { createTodayMenu } from './menu-today.js';
import { createTaskContent } from './task.js';
  
const createMenu = () => {

  const menu = document.createElement('div');
  menu.setAttribute('id', 'menu');

  const menuItems = document.createElement('div');
  menuItems.setAttribute('id', 'menu-items-container');

  menuItems.appendChild(createAddTaskForm());
  menuItems.appendChild(createInboxMenu());
  menuItems.appendChild(createTodayMenu);
  menuItems.appendChild(createNextSevenMenu());
  menu.appendChild(menuItems);

  return menu;
}

export { createMenu };