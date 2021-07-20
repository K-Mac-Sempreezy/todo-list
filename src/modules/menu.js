import { createTaskContent } from './task.js';

// const inboxSVG = require('../Components/SVG/inbox-file.svg');

const createAddTask = () => {
  const addTaskContainer = document.createElement('div');
  addTaskContainer.setAttribute('id', 'add-task-container');

  const addIconContainer = document.createElement('div');
  addIconContainer.setAttribute('id', 'add-task-icon-container');

  const addTaskIcon = document.createElement('p');
  addTaskIcon.setAttribute('id', 'add-task-icon');
  addTaskIcon.textContent = '+';

  const addTaskLabel = document.createElement('p');
  addTaskLabel.textContent = 'Add Task';
  addTaskLabel.setAttribute('id', 'add-task-label');

  addIconContainer.appendChild(addTaskIcon);
  addTaskContainer.appendChild(addIconContainer);
  addTaskContainer.appendChild(addTaskLabel);

  return addTaskContainer;
}

const createInbox = () => {
  const inboxContainer = document.createElement('div');
  inboxContainer.setAttribute('id', 'inbox-container');
  inboxContainer.setAttribute('data-nav', 'inbox');

  const inboxIcon = document.createElement('div');
  inboxIcon.setAttribute('class', 'icon-menu');
  inboxIcon.setAttribute('id', 'inbox-icon');
  
  const inboxLabel = document.createElement('p');
  inboxLabel.textContent = 'Inbox';

  const countContainer = document.createElement('div');
  countContainer.setAttribute('class', 'count-container');
  
  const inboxCount = document.createElement('p');
  inboxCount.setAttribute('class', 'count');
  inboxCount.textContent = '2';

  // inboxContainer.addEventListener('click', createInboxContent);
  
  
  countContainer.appendChild(inboxCount)
  inboxContainer.appendChild(inboxIcon);
  inboxContainer.appendChild(inboxLabel);
  inboxContainer.appendChild(countContainer);
  
  
  return inboxContainer;
}

const createToday = () => {
  const todayContainer = document.createElement('div');
  todayContainer.setAttribute('id', 'today-container');
  todayContainer.setAttribute('data-nav', 'today');
  
  const todayIcon = document.createElement('div');
  todayIcon.setAttribute('class', 'icon-menu');
  todayIcon.setAttribute('id', 'today-icon');
  
  
  const todayLabel = document.createElement('p');
  todayLabel.textContent = 'Today';
  todayLabel.style.fontWeight = '700';
  
  todayContainer.appendChild(todayIcon);
  todayContainer.appendChild(todayLabel);
  
  todayContainer.addEventListener('click', createTaskContent);
  
  return todayContainer;
}

const createNextSeven = () => {
  const nextSevenContainer = document.createElement('div');
  nextSevenContainer.setAttribute('id', 'next-seven-container');
  nextSevenContainer.setAttribute('data-nav', 'next-seven');
  
  const nextSevenIcon = document.createElement('div');
  nextSevenIcon.setAttribute('class', 'icon-menu');
  nextSevenIcon.setAttribute('id', 'next-seven-icon');
  
  
  const nextSevenLabel = document.createElement('p');
  nextSevenLabel.textContent = 'Next 7 Days';

  nextSevenContainer.appendChild(nextSevenIcon);
  nextSevenContainer.appendChild(nextSevenLabel);

  // nextSevenContainer.addEventListener('click', createContent);

  return nextSevenContainer;
}
  
const createMenu = () => {

  const menu = document.createElement('div');
  menu.setAttribute('id', 'menu');

  const menuItems = document.createElement('div');
  menuItems.setAttribute('id', 'menu-items-container');

  menuItems.appendChild(createAddTask());
  menuItems.appendChild(createInbox());
  menuItems.appendChild(createToday());
  menuItems.appendChild(createNextSeven());
  menu.appendChild(menuItems);

  return menu;
}

export { createMenu };