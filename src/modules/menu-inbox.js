import { createTaskContent } from './task';
import { myTasks } from './initial-load';

const createInboxMenu = () => {
  const inboxContainer = createInboxContainer();
  const inboxIcon = createInboxIcon();
  const inboxLabel = createInboxLabel();
  const countContainer = createCountContainer();
  const inboxCount = createInboxCount();

  countContainer.appendChild(inboxCount);
  inboxContainer.appendChild(inboxIcon);
  inboxContainer.appendChild(inboxLabel);
  inboxContainer.appendChild(countContainer);

  inboxContainer.addEventListener('click', createTaskContent);
  // inboxContainer.addEventListener('click', updateMenu);

  return inboxContainer;
};

const createInboxContainer = () => {
  const inboxContainer = document.createElement('div');
  inboxContainer.setAttribute('id', 'inbox-container');
  inboxContainer.setAttribute('data-nav', 'inbox');
  return inboxContainer;
};

const createInboxIcon = () => {
  const inboxIcon = document.createElement('div');
  inboxIcon.setAttribute('class', 'icon-menu');
  inboxIcon.setAttribute('id', 'inbox-icon');
  return inboxIcon;
};

const createInboxLabel = () => {
  const inboxLabel = document.createElement('p');
  inboxLabel.textContent = 'Inbox';
  return inboxLabel;
};

const createCountContainer = () => {
  const countContainer = document.createElement('div');
  countContainer.setAttribute('class', 'count-container');
  return countContainer;
};

const createInboxCount = () => {
  const inboxCount = document.createElement('p');
  inboxCount.setAttribute('class', 'count');
  inboxCount.textContent = myTasks.length;
  return inboxCount;
};

export { createInboxMenu };
