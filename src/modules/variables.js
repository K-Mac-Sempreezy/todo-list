import { Task } from './task-template';
import { formatISO } from 'date-fns';

let myTasks = JSON.parse(localStorage.getItem('myTasks') || '[]');

let initialLoadPageLabel = 'Inbox';
let remove = true;

const defaultTasks = [
  new Task(
    formatISO(new Date()),
    '12:30 Lunch with Sarah',
    'Meet at favorite restaurant',
    '#48CFAD',
    '#0000ff',
    'Learning',
    'None',
  ),

  new Task(
    formatISO(new Date()),
    '2:30 Call Luis',
    'Check in about new project',
    '#48CFAD',
    '#0000ff',
    'Learning',
    'None',
  ),
];

let myTasksIndex;
let priorityCircleColor;
let categoryCircleColor;
const setMyTasksIndex = (number) => {
  myTasksIndex = number;
  if(number) {
    priorityCircleColor = myTasks[number].priorityColor;
    categoryCircleColor = myTasks[number].categoryColor;
  }
};

let currentPageView = ''; //Initial Load Page
const setCurrentPageView = string => {
  currentPageView = string;
};

export {
  remove,
  myTasks,
  myTasksIndex,
  currentPageView,
  initialLoadPageLabel,
  priorityCircleColor,
  categoryCircleColor,
  defaultTasks,
  setMyTasksIndex,
  setCurrentPageView,
};
