import { Task } from './task-template';
// import { format } from 'date-fns';

let myTasks = JSON.parse(localStorage.getItem('myTasks') || '[]');

let initialLoadPageLabel = 'Inbox';

const defaultTasks = [
  new Task(
    new Date(),
    '12:30 Lunch with Sarah',
    'Meet at favorite restaurant',
    '#48CFAD',
    '#0000ff',
    'Learning',
    'None',
  ),

  new Task(
    new Date(),
    '2:30 Call Luis',
    'Check in about new project',
    '#48CFAD',
    '#0000ff',
    'Learning',
    'None',
  ),
];

let priorityCircleColor = '';
const setPriorityCircleColor = string => {
  priorityCircleColor = string;
  console.log(`priority: ${string}`);
};

let categoryCircleColor = '';
const setCategoryCircleColor = (string) => {
  categoryCircleColor = string;
  console.log(`category: ${string}`);
};

let taskToEdit;
const setTaskToEdit = number => {
  taskToEdit = myTasks[number];
  console.log(taskToEdit)
};

let currentPageView = ''; //Initial Load Page
const setCurrentPageView = string => {
  currentPageView = string;
};

export {
  myTasks,
  currentPageView,
  taskToEdit,
  initialLoadPageLabel,
  categoryCircleColor,
  priorityCircleColor,
  defaultTasks,
  setCategoryCircleColor,
  setPriorityCircleColor,
  setTaskToEdit,
  setCurrentPageView,
};
