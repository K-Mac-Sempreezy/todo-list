import '/src/style.css';
import { createMenu } from './create-menu.js';
import { createTask } from './create-task.js';
import { Task } from './class-task.js';
import { createHeader } from './create-header.js'
import { createElement } from './create-element.js';
import { createContentHeader } from './create-content-header.js';
import { createAddTaskForm } from './create-add-task-form.js';
import { setCurrentPageView } from './edit-task.js';

let myTasks = JSON.parse(localStorage.getItem('myTasks') || '[]');
let isFirstTime = JSON.parse(localStorage.getItem('isFirstTime') || '');
let initialLoadPageLabel = 'Inbox'; //or 'Next 7 Days', or 'Today'

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

const createContent = () => {

 const contentWrapper = createElement('div', {
    id: 'content-wrapper',
  });  
  
  const taskWrapper = createElement('div', {
    id: 'task-wrapper',
  });

  const contentHeader = createContentHeader(initialLoadPageLabel);
  const addTaskForm = createAddTaskForm();

  createDefaultVariables();
  setCurrentPageView(initialLoadPageLabel);
  
  myTasks.forEach((task, index) => {
    taskWrapper.appendChild(createTask(task, index));
  });

  contentWrapper.appendChild(contentHeader);
  contentWrapper.appendChild(addTaskForm);
  contentWrapper.appendChild(taskWrapper);
  return contentWrapper;
};

const pageLoad = () => {
  const header = createHeader();
  const menu = createMenu(initialLoadPageLabel);
  const content = createContent();
  
  document.body.appendChild(header);
  document.body.appendChild(menu);
  document.body.appendChild(content);
};

export { createElement, pageLoad, myTasks, Task };
