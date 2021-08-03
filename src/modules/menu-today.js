import { createTaskContent } from './task';
import { myTasks } from './initial-load';
import format from 'date-fns/format';

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
  todayContainer.setAttribute('data-nav', 'today');
  todayContainer.addEventListener('click', createTaskContent);
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
  todayLabel.textContent = 'Today';
  todayLabel.style.fontWeight = '700';
  return todayLabel;
};

const createTodayCount = () => {
  const count = document.createElement('div');
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
