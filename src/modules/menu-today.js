import { createTaskContent } from './task';
import { myTasks } from './initial-load';
import format from 'date-fns/format';
import { updateMenu } from './menu';

const createTodayMenu = () => {
  const todayContainer = createTodayContainer();
  const todayIcon = createTodayIcon();
  const todayLabel = createTodayLabel();
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

const createTodayLabel = () => {
  const todayLabel = document.createElement('p');
  todayLabel.setAttribute('id', 'menu-today-label');
  todayLabel.textContent = 'Today';
  todayLabel.style.fontWeight = '700';
  return todayLabel;
};

const createTodayCount = () => {
  const count = document.createElement('div');
  count.setAttribute('id', 'menu-today-count');
  count.setAttribute('class', 'count');
  const tasks = myTasks.filter(
    (task) =>
      format(new Date(task.date), 'MMM do yyyy') ===
      format(new Date(), 'MMM do yyyy')
  );
  count.textContent = tasks.length;
  return count;
};

export { createTodayMenu };
