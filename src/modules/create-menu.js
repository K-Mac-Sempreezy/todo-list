import { createElement, createElementMenu } from './create-element';
import { createMenuDivideLine } from './create-menu-divider';
import {
  svgIconMenuAdd,
  svgIconMenuInbox,
  svgIconMenuToday,
  svgIconMenuNext7,
} from './svg-variables';
import { handleAddTaskContainerDisplay, updateMenu } from './update-UI';
import { createDropDownOptions } from './create-add-task-form.js';
import { showTaskContent } from './update-UI.js';
import { initialLoadPageLabel } from './variables';

const createMenu = () => {
  const addElement = createElementMenu(
    'add-task',
    svgIconMenuAdd,
    false,
    'Add Task',
    {
      click: [handleAddTaskContainerDisplay, createDropDownOptions],
    }
  );

  const inboxElement = createElementMenu(
    'inbox',
    svgIconMenuInbox,
    true,
    'Inbox',
    {
      click: [showTaskContent, updateMenu],
    }
  );

  const todayElement = createElementMenu(
    'today',
    svgIconMenuToday,
    true,
    'Today',
    {
      click: [showTaskContent, updateMenu],
    }
  );

  const next7Element = createElementMenu(
    'next-seven',
    svgIconMenuNext7,
    true,
    'Next 7 Days',
    {
      click: [showTaskContent, updateMenu],
    }
  );

  const addProjectElement = createElementMenu(
    'add-project',
    svgIconMenuAdd,
    false,
    'Add Project',
    {
      click: [],
    }
  );

  const menu = createElement('div', {
    id: 'menu',
  });

  const menuItems = createElement('div', {
    id: 'menu-items-container',
  });

  if (initialLoadPageLabel === 'Inbox') {
    inboxElement.style.fontWeight = '700';
  } else if (initialLoadPageLabel === 'Today') {
    todayElement.style.fontWeight = '700';
  } else if (initialLoadPageLabel === 'Next 7 Days') {
    next7Element.style.fontWeight = '700';
  }

  menuItems.appendChild(addElement);
  menuItems.appendChild(createMenuDivideLine());
  menuItems.appendChild(inboxElement);
  menuItems.appendChild(todayElement);
  menuItems.appendChild(next7Element);
  menuItems.appendChild(createMenuDivideLine()); //adding second divider here
  menuItems.appendChild(addProjectElement);
  menu.appendChild(menuItems);

  return menu;
};

export { createMenu };
