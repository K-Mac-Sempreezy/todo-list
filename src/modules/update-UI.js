import {
  inboxTaskSort,
  next7TaskFilter,
  todayTaskFilter,
  sortMyTasksByDate,
  capitalizeFirstLetter
} from './edit-task.js';
import {
  taskToEdit,
  setTaskToEdit,
  setCurrentPageView,
  currentPageView,
  myTasks,
  setPriorityCircleColor,
  setCategoryCircleColor, 
  priorityCircleColor,
  categoryCircleColor
} from './variables.js';
import { populateTaskWrapper } from './initial-load.js';
import { Task } from './task-template.js';
import datepicker from 'js-datepicker';
import { format } from 'date-fns';
import { createDropDownOptions } from './create-add-task-form.js';

const updateContentHeaderLabel = contentLabel => {
  const label = document.getElementById('content-header-label');
  label.textContent = contentLabel;
};
const showTaskContent = e => {
  localStorage.setItem('myTasks', JSON.stringify(myTasks));
  const contentWrapper = document.getElementById('content-wrapper');
  const taskWrapper = document.getElementById('task-wrapper');
  clearTaskWrapper();

  if (e.target.id === 'menu-inbox-element-container') {
    populateTaskWrapper(inboxTaskSort());
    updateContentHeaderLabel('Inbox');
  } else if (e.target.id === 'menu-today-element-container') {
    populateTaskWrapper(todayTaskFilter());
    updateContentHeaderLabel('Today');
  } else if (e.target.id === 'menu-next-seven-element-container') {
    populateTaskWrapper(next7TaskFilter());
    updateContentHeaderLabel('Next 7 Days');
  }
};

const updateTasks = () => {
  const taskWrapper = document.getElementById('task-wrapper');
  const date = document.getElementById('task-date').value;
  const label = document.getElementById('add-task-input').value;
  const description = document.getElementById(
    'description-span'
  ).value;
  const categoryLabel = document.getElementById(
    'dropdown-title-category'
  ).textContent;
  const priorityLabel = document.getElementById(
    'dropdown-title-priority'
    ).textContent;
    console.log({categoryLabel, priorityLabel})
  
  if (!date) {
    return;
  }
  if (taskToEdit) { //this section edits task
    console.log(taskToEdit)
    taskToEdit.date = date;
    taskToEdit.label = label;
    taskToEdit.description = description;
    taskToEdit.priorityLabel = priorityLabel.toLowerCase().trim();
    taskToEdit.categoryLabel = categoryLabel.toLowerCase().trim();
    taskToEdit.priorityColor = priorityCircleColor;
    taskToEdit.categoryColor = categoryCircleColor;
    taskToEdit.currentMyTasksIndex = myTasks.indexOf(taskToEdit);
  } else { //this creates a new task if there is no { taskToEdit }
    const taskObject = new Task(
      date,
      label,
      description,
      categoryCircleColor,
      priorityCircleColor,
      categoryLabel,
      priorityLabel,
      );
      
      myTasks.push(taskObject);
      sortMyTasksByDate();
    }
    updateTaskContent();
    clearAddTaskForm();
};

const updateTaskContent = () => {
  localStorage.setItem('myTasks', JSON.stringify(myTasks));

  clearTaskWrapper();

  if (currentPageView === 'Inbox') {
    populateTaskWrapper(inboxTaskSort());
  } else if (currentPageView === 'Today') {
    populateTaskWrapper(todayTaskFilter());
  } else if (currentPageView === 'Next 7 Days') {
    populateTaskWrapper(next7TaskFilter());
  }
  updateContentHeaderLabel(currentPageView);
};

const updateMenu = e => {
  const inboxLabel = document.getElementById('menu-inbox-label');
  const todayLabel = document.getElementById('menu-today-label');
  const next7Label = document.getElementById('menu-next-seven-label');
  if (e.target.id === 'menu-today-element-container') {
    inboxLabel.style.fontWeight = '300';
    todayLabel.style.fontWeight = '700';
    next7Label.style.fontWeight = '300';
    setCurrentPageView('Today');
  } else if (e.target.id === 'menu-inbox-element-container') {
    inboxLabel.style.fontWeight = '700';
    todayLabel.style.fontWeight = '300';
    next7Label.style.fontWeight = '300';
    setCurrentPageView('Inbox');
  } else if (e.target.id === 'menu-next-seven-element-container') {
    inboxLabel.style.fontWeight = '300';
    todayLabel.style.fontWeight = '300';
    next7Label.style.fontWeight = '700';
    setCurrentPageView('Next 7 Days');
  }
};

const updateMenuCount = () => {
  const inboxCount = myTasks.length;
  const todayCount = todayTaskFilter().length;
  const next7Count = next7TaskFilter().length;

  document.getElementById('menu-inbox-count').textContent = inboxCount;
  document.getElementById('menu-today-count').textContent = todayCount;
  document.getElementById('menu-next-seven-count').textContent = next7Count;
};

const clearTaskWrapper = () => {
  const taskWrapper = document.getElementById('task-wrapper');
  if (taskWrapper) {
    while (taskWrapper.firstElementChild) {
      taskWrapper.firstElementChild.remove();
    }
  }
};

const deleteTask = e => {
  const elementIndex = findElementDataKey(e);
  const element = document.getElementById(`task-element-${elementIndex}`);
  element.remove();
  myTasks.splice(elementIndex, 1);
  localStorage.setItem('myTasks', JSON.stringify(myTasks));
};

const populateAddTaskForm = () => {
  let {
    date,
    label,
    description,
    categoryColor,
    priorityColor,
    categoryLabel,
    priorityLabel,
    person,
    avatar,
  } = taskToEdit;

  const addTaskForm = document.getElementById('add-task-form-container');
  const formLabel = document.getElementById('add-task-input');
  const formDate = document.getElementById('task-date');
  const formDescription = document.getElementById('description-span');
  const formCategory = document.getElementById('dropdown-title-category');
  const formPriority = document.getElementById('dropdown-title-priority');

  addTaskForm.style.display = 'flex';
  formLabel.value = label;
  formDate.value = format(new Date(date), 'MMM do, yyyy');
  formDescription.textContent = description;
  formCategory.textContent = capitalizeFirstLetter(categoryLabel);
  formPriority.textContent = capitalizeFirstLetter(priorityLabel);
  createDropDownOptions();
};

const handleDeleteEditIconsOpacity1 = e => {
  document.getElementById(
    `task-delete-${findElementDataKey(e)}`
  ).style.opacity = 1;
  document.getElementById(
    `task-edit-${findElementDataKey(e)}`
  ).style.opacity = 1;
};

const handleDeleteEditIconsOpacity0 = e => {
  document.getElementById(
    `task-delete-${findElementDataKey(e)}`
  ).style.opacity = 0;
  document.getElementById(
    `task-edit-${findElementDataKey(e)}`
  ).style.opacity = 0;
};

const findElementDataKey = e => {
  let key = e.target.dataset.key;
  return key;
};

const toggleClass = (elem, className) => {
  const classList = elem.getAttribute('class');
  if (classList.includes(className)) {
    const newClasses = classList.replace(className, '').trim();
    elem.setAttribute('class', newClasses);
  } else {
    const newClassList = `${classList} ${className}`;
    elem.setAttribute('class', newClassList);
  }
  return elem;
};

const toggleDisplay = elem => {
  const curDisplayStyle = elem.style.display;

  if (curDisplayStyle === 'none' || curDisplayStyle === '') {
    elem.style.display = 'block';
  } else {
    elem.style.display = '';
  }
};

const handleAddIconContainer = e => {
  // e.stopPropagation;
  const addIcon = document.getElementById('add-task-icon');
  toggleClass(addIcon, 'rotate-90');
};

const toggleMenuDisplay = e => {
  let menu;
  let icon;
  if (e.target.id === 'add-task-dropdown-title-container-category') {
    menu = document.getElementById('option-menu-category');
    icon = document.getElementById('dropdown-icon-category');
  } else if (e.target.id === 'add-task-dropdown-title-container-priority') {
    menu = document.getElementById('option-menu-priority');
    icon = document.getElementById('dropdown-icon-priority');
  }

  toggleDisplay(menu);
  toggleClass(menu, 'hide');
  toggleClass(icon, 'rotate-90');
};

const handleOptionSelected = e => {
  const id = e.target.parentNode.id;
  const target = id.replace(/option-menu-/g, '');
  const newValue = e.target.textContent;
  const titleElem = document.getElementById(`dropdown-title-${target}`);
  const icon = document.getElementById(`dropdown-icon-${target}`);

  if (target === 'priority') {
    setPriorityCircleColor(e.target.dataset.color);
  } else if (target === 'category') {
    setCategoryCircleColor(e.target.dataset.color);
  }

  toggleClass(e.target.parentNode, 'hide');
  toggleClass(icon, 'rotate-90');

  titleElem.textContent = newValue;
  titleElem.appendChild(icon);
};

const handleAddTaskContainerDisplay = () => {
  const container = document.getElementById('add-task-form-container');
  container.style.display = 'flex';
};

const clearAddTaskForm = () => {
  document.getElementById('add-task-form-container').style.display = 'none';
  document.getElementById('add-task-input').value = '';
  document.getElementById('task-date').value = '';
  document.getElementById('description-span').value = '';
  document.getElementById('dropdown-title-category').textContent = 'Category';
  document.getElementById('dropdown-title-priority').textContent = 'Priority';
  setTaskToEdit('');
  setPriorityCircleColor('');
  setCategoryCircleColor('');
};

const dateSelect = e => {
  const picker = datepicker('#task-date', {
    formatter: (input, date) => {
      const value = format(new Date(date), 'MMM do, yyyy');
      input.value = value;
    },
  });
  e.stopPropagation();
  const isHidden = picker.calendarContainer.classList.contains('qs-hidden');
  picker[isHidden ? 'show' : 'hide']();
};

export {
  updateContentHeaderLabel,
  updateTaskContent,
  updateTasks,
  updateMenu,
  updateMenuCount,
  clearTaskWrapper,
  deleteTask,
  populateAddTaskForm,
  handleDeleteEditIconsOpacity1,
  handleDeleteEditIconsOpacity0,
  clearAddTaskForm,
  handleAddTaskContainerDisplay,
  dateSelect,
  handleOptionSelected,
  toggleDisplay,
  toggleMenuDisplay,
  toggleClass,
  handleAddIconContainer,
  showTaskContent
};
