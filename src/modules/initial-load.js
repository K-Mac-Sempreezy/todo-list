import '/src/style.css';
import { createMenu } from './menu.js';
import { createTask, createTaskWrapper } from './task.js';
import { createContentHeader } from './content-header.js';
import { createAddTaskForm } from './add-task-form.js';

let myTasks = JSON.parse(localStorage.getItem('myTasks') || '[]');
let isFirstTime = JSON.parse(localStorage.getItem('isFirstTime') || '');
// let initialLoadPageView = 'today';

class Task {
  constructor(
    date,
    priorityColor,
    label,
    description,
    category,
    categoryColor,
    person = false,
    avatar = false
  ) {
    this.date = date;
    this.priorityColor = priorityColor;
    this.label = label;
    this.description = description;
    this.category = category;
    this.categoryColor = categoryColor;
    this.person = person;
    this.avatar = avatar;
  }
}

const createHeader = () => {
  const header = document.createElement('header');
  header.setAttribute('id', 'header');

  const logo = document.createElement('h3');
  logo.setAttribute('id', 'header-logo');
  logo.textContent = 'todo-it';

  header.appendChild(logo);

  return header;
};

const createContentWrapper = () => {
  const contentWrapper = document.createElement('div');
  contentWrapper.setAttribute('id', 'content-wrapper');
  return contentWrapper;
};

const createDefaultVariables = () => {
  const date = new Date();
  const defaultTasks = [
    new Task(
      date,
      'rgb(121, 121, 121)',
      '12:30 Lunch with Sarah',
      'Meet at favorite restaurant',
      'personal',
      'rgb(255, 255, 0)'
    ),

    new Task(
      date,
      'rgb(25, 150, 15)',
      '2:30 Call Luis',
      'Check in about new project',
      'work',
      '#236abd'
    ),
  ];

  if (myTasks.length <= 0 && isFirstTime === '') {
    defaultTasks.forEach((task) => myTasks.push(task));
    isFirstTime = false;
  }

  localStorage.setItem('myTasks', JSON.stringify(myTasks));
  localStorage.setItem('isFirstTime', JSON.stringify(isFirstTime));
};

const createDefaultContent = () => {
  //if no tasks created (ie. first time opening app)

  createDefaultVariables();
  const contentWrapper = createContentWrapper();
  const todayHeader = createContentHeader('Today');
  const addTaskForm = createAddTaskForm();
  const taskWrapper = createTaskWrapper();

  myTasks.forEach((task, index) => {
    taskWrapper.appendChild(createTask(task, index));
  });

  contentWrapper.appendChild(todayHeader);
  contentWrapper.appendChild(addTaskForm);
  contentWrapper.appendChild(taskWrapper);

  return contentWrapper;
};

const pageLoad = () => {
  const header = createHeader();
  const menu = createMenu(initialLoadPageView);
  const defaultContent = createDefaultContent();

  document.body.appendChild(header);
  document.body.appendChild(menu);
  document.body.appendChild(defaultContent);
};

export { pageLoad, myTasks, Task };
