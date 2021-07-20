import '/src/style.css';
import { createMenu } from './menu.js';
import { createTask, createTaskWrapper } from './task.js';
import { createTodayHeader } from './today.js';

// class Task {
//   constructor(priority, label, category, categoryColor, person = false, avatar = false) {
//     priority;
//     label;
//     category;
//     categoryColor;
//     person;
//     avatar;
//   }
//   newTaskObject(priority, label, category, categoryColor, person, avatar) {
//     createTask(priority, label, category, categoryColor, person, avatar)
//   };
// }

const createHeader = () => {
  const header = document.createElement('header');
  header.setAttribute('id', 'header');

  const logo = document.createElement('h3');
  logo.setAttribute('id', 'header-logo'); 
  logo.textContent = 'todo-it';
  
  header.appendChild(logo);
  
  return header;
}

const createDefaultContent = () => {
  //if no tasks created (ie. first time opening app)
  
  const contentWrapper = document.createElement('div');
  contentWrapper.setAttribute('id', 'content-wrapper');
  
  const taskWrapper = createTaskWrapper();
  taskWrapper.appendChild(createTask(
    'rgb(121, 121, 121)',
    '12:30 Lunch with Sarah',
    'personal',
    'rgb(255, 255, 0)'
  ));
  contentWrapper.appendChild(createTodayHeader())
  contentWrapper.appendChild(taskWrapper);
  console.log(taskWrapper)

  return contentWrapper;
};

const pageLoad = () => {

  document.body.appendChild(createHeader());
  document.body.appendChild(createMenu());
  document.body.appendChild(createDefaultContent());

}

export { pageLoad };