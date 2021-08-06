import { createAddTaskMenu } from './create-menu-add-task';
import { createInboxMenu } from './create-menu-inbox';
import { createNext7Menu } from './create-menu-next-seven';
import { createTodayMenu } from './create-menu-today';
import { createElement } from './create-element';

const createMenu = initialLoadPageLabel => {
  const menu = createElement('div', {
    id: 'menu',
  });

  const menuItems = createElement('div', {
    id: 'menu-items-container',
  });

  menuItems.appendChild(createAddTaskMenu());

  if (initialLoadPageLabel === 'Inbox') {
    menuItems.appendChild(createInboxMenu(initialLoadPageLabel));
    menuItems.appendChild(createTodayMenu());
    menuItems.appendChild(createNext7Menu());
  } else if (initialLoadPageLabel === 'Today') {
    menuItems.appendChild(createInboxMenu());
    menuItems.appendChild(createTodayMenu(initialLoadPageLabel));
    menuItems.appendChild(createNext7Menu());
  } else if (initialLoadPageLabel === 'Next 7 Days') {
    menuItems.appendChild(createInboxMenu());
    menuItems.appendChild(createTodayMenu());
    menuItems.appendChild(createNext7Menu(initialLoadPageLabel));
  }
  menu.appendChild(menuItems);
  return menu;
};


export { createMenu };
