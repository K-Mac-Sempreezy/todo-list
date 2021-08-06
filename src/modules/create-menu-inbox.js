import { createTaskContent } from './create-task';
import { myTasks } from './initial-load';
import { updateMenu } from './update-UI';

const createInboxMenu = (initialLoadPageLabel) => {
  const inboxContainer = createInboxContainer();
  const inboxIcon = createInboxIcon();
  const inboxLabel = createInboxLabel(initialLoadPageLabel);
  const inboxCount = createInboxCount();

  inboxContainer.appendChild(inboxIcon);
  inboxContainer.appendChild(inboxLabel);
  inboxContainer.appendChild(inboxCount);

  inboxContainer.addEventListener('click', createTaskContent);
  inboxContainer.addEventListener('click', updateMenu);

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

const createInboxLabel = (initialLoadPageLabel) => {
  const inboxLabel = document.createElement('p');
  inboxLabel.setAttribute('id', 'menu-inbox-label');
  inboxLabel.textContent = 'Inbox';
  if (initialLoadPageLabel === 'Inbox') {
    inboxLabel.style.fontWeight = '700';
  }
  return inboxLabel;
};

const createInboxCount = () => {
  const inboxCount = document.createElement('p');
  inboxCount.setAttribute('class', 'count');
  inboxCount.setAttribute('id', 'menu-inbox-count');
  inboxCount.textContent = myTasks.length;
  return inboxCount;
};

export { createInboxMenu };
