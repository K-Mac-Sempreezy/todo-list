import { myTasks } from './initial-load.js';
import format from 'date-fns/format';
import { createTask } from './create-task.js';
import { createContentHeader } from './create-content-header.js';
import { createAddTaskForm } from './create-add-task-form.js';

let taskToEdit;
const setTaskToEdit = (string) => {
  taskToEdit = string;
};

let currentPageView; //Initial Load Page
const setCurrentPageView = (string) => {
  currentPageView = string;
};

const editTask = (e) => {
  const id = e.target.id;
  const index = id.replace(/task-edit-/g, '');
  let tasks;
  let currentListIndex;

  if (currentPageView === 'Inbox') {
    tasks = myTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (currentPageView === 'Today') {
    tasks = myTasks
      .filter((task) => {
        return (
          format(new Date(task.date), 'yyyy-MM-dd') ==
          format(new Date(), 'yyyy-MM-dd')
        );
      })
      .sort((a, b) => (a, b) => new Date(a.date) - new Date(b.date));
  } else if (currentPageView === 'Next 7 Days') {
    tasks = myTasks
      .filter((task) => {
        const fromUnix = new Date().getTime() / 1000;
        const untilUnix = new Date().setDate(new Date().getDate() + 7) / 1000;
        return (
          new Date(task.date).getTime() / 1000 >= fromUnix &&
          new Date(task.date).getTime() / 1000 <= untilUnix
        );
      })
      .sort((a, b) => (a, b) => new Date(a.date) - new Date(b.date));
  }
  currentListIndex = tasks[index];
  taskToEdit = myTasks[myTasks.indexOf(currentListIndex)];
  taskToEdit.edit = true;
  taskToEdit.currentMyTasksIndex = myTasks.indexOf(taskToEdit);
  populateAddTaskForm(taskToEdit);
};

const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
}

const todayTaskFilter = () => {
  const today = myTasks.filter(
    (task) =>
      format(new Date(task.date), 'MMM do yyyy') ===
      format(new Date(), 'MMM do yyyy')
  );
  return today;
};

const next7TaskFilter = () => {
  const next7Days = myTasks
    .filter((task) => {
      const fromUnix = new Date().getTime() / 1000;
      const untilUnix = new Date().setDate(new Date().getDate() + 7) / 1000;
      return (
        new Date(task.date).getTime() / 1000 >= fromUnix &&
        new Date(task.date).getTime() / 1000 <= untilUnix
      );
    })
    .sort((a, b) => (a, b) => new Date(a.date) - new Date(b.date));
  return next7Days;
};

export {
  currentPageView,
  taskToEdit,
  editTask,
  setTaskToEdit,
  setCurrentPageView,
  todayTaskFilter,
  next7TaskFilter,
};
