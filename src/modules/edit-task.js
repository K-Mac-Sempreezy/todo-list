import { myTasks } from './initial-load.js';
import { format, formatISO, addDays, isWithinInterval } from 'date-fns';
import { populateAddTaskForm } from './update-UI.js';
import { currentPageView, setMyTasksIndex } from './variables.js';
import { createDropdownOptions } from './create-add-task-form.js';

const editTask = e => {
  const id = e.target.id;
  const index = id.replace(/task-edit-/g, '');
  let tasks;

  if (currentPageView === 'Inbox') {
    tasks = inboxTaskSort();
  } else if (currentPageView === 'Today') {
    tasks = todayTaskFilter();
  } else if (currentPageView === 'Next 7 Days') {
    tasks = next7TaskFilter();
  }

  createDropdownOptions();

  const myTasksIndex = myTasks.indexOf(tasks[index]);
  setMyTasksIndex(myTasksIndex);
  populateAddTaskForm(myTasksIndex);
};

const capitalizeFirstLetter = string => {
  return string[0].toUpperCase() + string.slice(1);
};

const sortMyTasksByDate = () => {
  myTasks
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach(task => (task.date = formatISO(new Date(task.date))));
  localStorage.setItem('myTasks', JSON.stringify(myTasks));
};

const inboxTaskSort = () => {
  const sortedTasks = myTasks.sort(
    (a, b) =>
      format(new Date(b.date), 'yyyy-MM-dd') -
      format(new Date(a.date), 'yyyy-MM-dd')
  );
  return sortedTasks;
};

const todayTaskFilter = () => {
  const todayDay = new Date();
  const today = myTasks.filter(task => {
    return (
      formatISO(new Date()) ===
      formatISO(new Date(task.date))
    );
  });
  return today;
};

const next7TaskFilter = () => {
  const next7Days = myTasks
    .filter(task => {
      const formattedDate = format(new Date(task.date), 'yyyy-MM-d');
      const yesterday = format(addDays(new Date(), -1), 'yyyy-MM-d');
      const until7Days = format(addDays(new Date(), 7), 'yyyy-MM-d');
      const dateInRange = isWithinInterval(new Date(formattedDate), {
        start: new Date(yesterday),
        end: new Date(until7Days),
      });
      if (dateInRange === true) {
        return task;
      }
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  return next7Days;
};

export {
  editTask,
  inboxTaskSort,
  todayTaskFilter,
  next7TaskFilter,
  capitalizeFirstLetter,
  sortMyTasksByDate
};
