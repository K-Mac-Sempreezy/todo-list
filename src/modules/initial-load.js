import '/src/style.css';
import { createMenu } from './menu.js';
import { createTask, createTaskWrapper, createTaskFactory, createTaskContent } from './task.js';
import { createTodayHeader } from './today.js';
import { createAddTaskForm } from './add-task-form.js';

let myTasks = JSON.parse(localStorage.getItem('myTasks') || '[]');

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
  
  const defaultTask = {
    priority: 'rgb(121, 121, 121)',
    label: '12:30 Lunch with Sarah',
    category: 'personal',
    categoryColor: 'rgb(255, 255, 0)',
    person: false,
    avatar: false,
  };
  const otherDefaultTask = {
    priority: 'rgb(25, 150, 15)',
    label: '2:30 Call Luis',
    category: 'work',
    categoryColor: '#236abd',
    person: false,
    avatar: false,
  };
  
  myTasks = [];
  myTasks.push(defaultTask);
  myTasks.push(otherDefaultTask);
  localStorage.setItem('myTasks', JSON.stringify(myTasks));
}

const createDefaultContent = () => {
  //if no tasks created (ie. first time opening app)
  
  createDefaultVariables();
  const contentWrapper = createContentWrapper();
  const todayHeader = createTodayHeader();
  const addTaskForm = createAddTaskForm();
  const taskWrapper = createTaskWrapper();
  myTasks.forEach(task => {
    taskWrapper.appendChild(createTask(task));
  });
  // taskContent();
  
  contentWrapper.appendChild(todayHeader);
  contentWrapper.appendChild(addTaskForm);
  contentWrapper.appendChild(taskWrapper);
  
  return contentWrapper;
  
};

const pageLoad = () => {
  const header = createHeader();
  const menu = createMenu();
  const defaultContent = createDefaultContent();
  
  document.body.appendChild(header);
  document.body.appendChild(menu);
  document.body.appendChild(defaultContent);
};

export { pageLoad, myTasks };
