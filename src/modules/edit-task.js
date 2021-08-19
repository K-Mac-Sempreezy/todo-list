import { myTasks, setLocalStorage } from './variables.js';
import { format, formatISO, addDays, isWithinInterval } from 'date-fns';
import { populateAddTaskForm } from './update-UI.js';
import { currentPageView, setMyTasksIndex, setTaskEdit, myProjects } from './variables.js';
import { createDropdownOptions } from './create-add-task-form.js';

const editTask = e => {
  createDropdownOptions();
  setMyTasksIndex(e);
  setTaskEdit(true);
  populateAddTaskForm();
};

const taskFilterForCurrentPage = () => {
  let tasks;
  if (currentPageView === 'Inbox') {
    tasks = inboxTaskSort();
  } else if (currentPageView === 'Today') {
    tasks = todayTaskFilter();
  } else if (currentPageView === 'Next 7 Days') {
    tasks = next7TaskFilter();
  }
  return tasks;
}

const sortMyTasksByDate = () => {
  setLocalStorage('myTasks', myTasks);
  if (myTasks.length > 1) {
    myTasks
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach(task => (task.date = formatISO(new Date(task.date))));
    setLocalStorage('myTasks', myTasks);
  } else {
    return;
  }
};

const sortMyProjectsByDate = () => {
  if (myProjects.length > 1) {
    myProjects
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach(project => (project.date = formatISO(new Date(project.date))));
    setLocalStorage('myProjects', myProjects);
  } else {
    return;
  }
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
  const todayDay = format(new Date(), 'yyyy-MM-dd');
  const today = myTasks.filter(task => {
    return todayDay === format(new Date(task.date), 'yyyy-MM-dd');
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

const projectTaskFilter = (projectName) => {
  return myTasks.filter(task => task.project === projectName)
}


export {
  editTask,
  inboxTaskSort,
  todayTaskFilter,
  next7TaskFilter,
  sortMyTasksByDate,
  projectTaskFilter,
  sortMyProjectsByDate,
  taskFilterForCurrentPage
};
