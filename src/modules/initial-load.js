import '/src/style.css';
import { createMenu } from './create-menu.js';
import { createTask, createTaskDateDividerElement } from './create-task.js';
import { Task } from './task-template.js';
import { createHeader } from './create-header.js';
import { createElement } from './create-element.js';
import { createContentHeader } from './create-content-header.js';
import { createAddTaskForm } from './create-add-task-form.js';
import { clearTaskWrapper } from './update-UI.js';
import { format } from 'date-fns';
import { inboxTaskSort, sortMyTasksByDate } from './edit-task.js';
import {
  initialLoadPageLabel,
  setCurrentPageView,
  defaultTasks,
  myTasks
} from './variables.js';


const createDefaultVariables = () => {
  if (myTasks.length <= 0) {
    defaultTasks.forEach(task => myTasks.push(task));
  }
  localStorage.setItem('myTasks', JSON.stringify(myTasks));
};

const createContent = () => {
  const contentWrapper = createElement('div', {
    id: 'content-wrapper',
  });

  const taskWrapper = createElement('div', {
    id: 'task-wrapper',
  });

  const contentHeader = createContentHeader();
  const addTaskForm = createAddTaskForm();

  createDefaultVariables();
  setCurrentPageView(initialLoadPageLabel);
  sortMyTasksByDate();

  contentWrapper.appendChild(contentHeader);
  contentWrapper.appendChild(addTaskForm);
  contentWrapper.appendChild(taskWrapper);

  return contentWrapper;
};

const pageLoad = () => {
  const header = createHeader();
  const menu = createMenu();
  const content = createContent();

  document.body.appendChild(header);
  document.body.appendChild(menu);
  document.body.appendChild(content);
  populateTaskWrapper(inboxTaskSort());
};

const populateTaskWrapper = sortedTaskFunction => {
  localStorage.setItem('myTasks', JSON.stringify(myTasks));
  const taskWrapper = document.getElementById('task-wrapper');
  let dates = [];
  clearTaskWrapper();

  sortedTaskFunction.forEach(task => {
    if (
      !document.getElementById(
        `task-date-divider-element-${format(new Date(task.date), 'MM-dd-yyyy')}`
      )
    ) {
      taskWrapper.appendChild(
        createTaskDateDividerElement(format(new Date(task.date), 'MM-dd-yyyy'))
      );
    }
  });

  sortedTaskFunction.forEach((task, index) => {
    const dividerTaskDate = document.getElementById(
      `task-divider-content-container-${format(
        new Date(task.date),
        'MM-dd-yyyy'
      )}`
    );
    dividerTaskDate.append(createTask(task, index));
  });
};

export { createElement, pageLoad, populateTaskWrapper, myTasks, Task };
