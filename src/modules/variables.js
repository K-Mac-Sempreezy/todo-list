import { Task, MenuElement } from './class-templates';
import { createDropdownOptions } from './create-add-task-form.js';
import { dateSelect } from './date';
import { formatISO } from 'date-fns';
import { taskFilterForCurrentPage } from './edit-task.js';
import { displayForm, handleView, findElementDataKey } from './update-UI';
import {
  svgInboxBig,
  svgIconMenuAdd,
  svgIconMenuInbox,
  svgIconMenuToday,
  svgIconMenuNext7,
} from './svg-variables';

let myTasks = JSON.parse(localStorage.getItem('myTasks') || '[]');
let myProjects = JSON.parse(localStorage.getItem('myProjects') || '[]');
let isFirstTime = JSON.parse(localStorage.getItem('isFirstTime') || '[]');

let currentPageView = { pageLabel: '', type: '' };

let initialLoadPageLabel = 'Inbox';
let initialLoadPageIcon = svgInboxBig;
let remove = true;
let taskEdit = false;
let projectEdit = false;
let addProject = false;
let addTask = false;
let projectName;
let myTasksIndex;
let myProjectsIndex;
let priorityCircleColor;
let categoryCircleColor;
let myTasksToDelete = [];

// let myProjectsIndex;

//
//
//
// Menu Items

const menuElementsList = [
  new MenuElement('add-task', svgIconMenuAdd, false, 'Add Task', {
    click: [displayForm, createDropdownOptions, dateSelect],
  }),

  new MenuElement('inbox', svgIconMenuInbox, true, 'Inbox', {
    click: [handleView],
  }),

  new MenuElement('today', svgIconMenuToday, true, 'Today', {
    click: [handleView],
  }),

  new MenuElement('next-seven', svgIconMenuNext7, true, 'Next 7 Days', {
    click: [handleView],
  }),

  new MenuElement('add-project', svgIconMenuAdd, false, 'Add Project', {
    click: [displayForm, createDropdownOptions, dateSelect],
  }),
];

//
//
//
//Color Attribute Objects

const colorLists = {
  categoryColorList: {
    Personal: 'hsla(284, 100%, 50%, 1)', //Electric Violet [rgba(189, 0, 255, 1), #BD00FF]
    Work: 'hsla(212, 100%, 50%, 1)', //Azure Radiance [rgba(189, 0, 255, 1), #0078FF]
    Hobby: 'hsla(163, 80%, 28%, 1)', //Surfie Green [rgba(14, 128, 95, 1), #0E805F]
    Learning: 'hsla(339, 100%, 68%, 1)', //Brink Pink [rgba(255, 91, 149, 1), #FF5B95]
  },

  priorityColorList: {
    Urgent: 'hsla(358, 97%, 59%, 1)', //Red Orange [rgba(252, 51, 57, 1), #FC3339]
    Medium: 'hsla(36, 100%, 50%, 1)', //Orange Peel [rgba(255, 154, 0, 1), #FF9A00]
    Low: 'hsla(67, 100%, 50%, 1)', //Chartreuse Yellow [rgba(227, 255, 0, 1), #E3FF00]
    None: 'hsla(127, 100%, 50%, 1)', //Green [rgba(1, 255, 31, 1), #01FF1F]
  },
};

const defaultTasks = [
  new Task(
    formatISO(new Date()),
    // time,
    '12:30PM  Example Task',
    'Meet at favorite restaurant',
    '#48CFAD',
    '#0000ff',
    'Learning',
    'None'
  ),

  new Task(
    formatISO(new Date()),
    // time,
    '2:30PM  Second Example Task',
    'Check in about new project',
    '#48CFAD',
    '#0000ff',
    'Learning',
    'None'
  ),
];

//
//
//Setter functions

const setAddTask = (value) => {
  addTask = value;
}

const setAddProject = (value) => {
  addProject = value;
}

const setProjectName = (projectNameToEdit) => {
  projectName = projectNameToEdit;
}
const setIsFirstTime = (value) => {
    isFirstTime = { isFirstTime: value };
    setLocalStorage('isFirstTime', isFirstTime);
}

const setLocalStorage = (string, object) => {
  localStorage.setItem(string, JSON.stringify(object));
};

const clearMyTasksToDelete = e => {
  myTasksToDelete = [];
};

const setMyTasksToDelete = (number) => {
  myTasksToDelete.push(number);
  console.log(myTasksToDelete)
}; 

const setCurrentPageView = (pageName, pageType) => {
  //pageName = '' && pageType = 'Menu' or 'Project';
  currentPageView.pageLabel = pageName.trim();
  currentPageView.type = pageType;
};

const setTaskEdit = value => {
  taskEdit = value;
};

const setProjectEdit = value => {
  projectEdit = value;
};

const setMyProjectsIndex = (e) => {
  if (!e) {
    myProjectsIndex = null;
    setLocalStorage('myProjects', myProjects);
    return;
  }
  setLocalStorage('myProjects', myProjects);
  const key = findElementDataKey(e);
  myProjectsIndex = key;
  return key;
}

const setMyTasksIndex = e => {
  if (!e) {
    myTasksIndex = null;
    setLocalStorage('myTasks', myTasks);
    return;
  }
  setLocalStorage('myTasks', myTasks);
  const key = findElementDataKey(e);
  const element = document.getElementById(`task-element-${key}`);
  let tasks = taskFilterForCurrentPage();
  myTasksIndex = myTasks.indexOf(tasks[key]);
  console.log(myTasksIndex)
  return myTasksIndex;
};

const setPriorityCircleColor = string => {
  priorityCircleColor = string.trim();
};

const setCategoryCircleColor = string => {
  categoryCircleColor = string;
};

export {
  remove,
  myTasks,
  myProjects,
  taskEdit,
  projectEdit,
  addProject,
  projectName,
  isFirstTime,
  addTask,
  myTasksIndex,
  myProjectsIndex,
  currentPageView,
  initialLoadPageLabel,
  initialLoadPageIcon,
  priorityCircleColor,
  categoryCircleColor,
  myTasksToDelete,
  menuElementsList,
  colorLists,
  defaultTasks,
  setProjectName,
  setIsFirstTime,
  setAddTask,
  setAddProject,
  setProjectEdit,
  clearMyTasksToDelete,
  setLocalStorage,
  setPriorityCircleColor,
  setCategoryCircleColor,
  setTaskEdit,
  setMyTasksIndex,
  setMyTasksToDelete,
  setMyProjectsIndex,
  setCurrentPageView,
};
