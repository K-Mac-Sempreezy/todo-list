import { createTaskContent } from './create-task.js';
import { updateMenu } from './update-UI.js';
import { todayTaskFilter } from './edit-task.js';

const createTodayMenu = (initialLoadPageLabel) => {
  const todayContainer = createTodayContainer();
  const todayIcon = createTodayIcon();
  const todayLabel = createTodayLabel(initialLoadPageLabel);
  const count = createTodayCount();

  todayContainer.appendChild(todayIcon);
  todayContainer.appendChild(todayLabel);
  todayContainer.appendChild(count);
  return todayContainer;
};

const createTodayContainer = () => {
  const todayContainer = document.createElement('div');
  todayContainer.setAttribute('id', 'today-container');
  todayContainer.addEventListener('click', createTaskContent);
  todayContainer.addEventListener('click', updateMenu);
  return todayContainer;
};

const createTodayIcon = () => {
  const todayIcon = document.createElement('div');
  todayIcon.setAttribute('class', 'icon-menu');
  todayIcon.setAttribute('id', 'today-icon');
  return todayIcon;
};

const createTodayLabel = (initialLoadPageLabel) => {
  const todayLabel = document.createElement('p');
  todayLabel.setAttribute('id', 'menu-today-label');
  todayLabel.textContent = 'Today';
  if (initialLoadPageLabel === 'Today') {
    todayLabel.style.fontWeight = '700';
  }
  return todayLabel;
};

const createTodayCount = () => {
  const count = document.createElement('div');
  count.setAttribute('id', 'menu-today-count');
  count.setAttribute('class', 'count');
  count.textContent = todayTaskFilter().length;
  return count;
};

export { createTodayMenu };


