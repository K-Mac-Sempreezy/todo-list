import {
  inboxTaskSort,
  next7TaskFilter,
  todayTaskFilter,
  sortMyTasksByDate,
  projectTaskFilter,
  sortMyProjectsByDate,
  taskFilterForCurrentPage,
} from './edit-task.js';
import {
  priorityCircleColor,
  categoryCircleColor,
  setPriorityCircleColor,
  setCategoryCircleColor,
  initialLoadPageLabel,
  setCurrentPageView,
  currentPageView,
  myTasks,
  // defaultTasks,
  myTasksIndex,
  setMyTasksIndex,
  taskEdit,
  setIsFirstTime,
  isFirstTime,
  setTaskEdit,
  setLocalStorage,
  setAddProject,
  addProject,
  addTask,
  setAddTask,
  myProjects,
} from './variables.js';
import { createTaskDateDividerElement, createTask } from './create-task.js';
import { Task, Project } from './class-templates.js';
import { format } from 'date-fns';
import { dateSelect, getPickerValue, setPickerValue } from './date';
import { svgInboxBig, svgNextSevenBig, svgTodayBig } from './svg-variables.js';
import { createElementMenuAddProject } from './create-menu.js';

//

// Display

const toggleOverlay = () => {
  const overlay = document.getElementById('overlay');

  if (!overlay.style.display) {
    overlay.style.display = 'none';
  }
  if (overlay.style.display === 'none') {
    overlay.style.display = 'block';
  } else {
    overlay.style.display = 'none';
  }
};

const toggleConfirm = e => {
  const popup = document.getElementById('confirm-container');

  if (!popup.style.display) {
    popup.style.display = 'none';
  }

  if (popup.style.display === 'none') {
    popup.style.display = 'flex';
    setMyTasksIndex(e);
  } else {
    popup.style.display = 'none';
    setMyTasksIndex();
  }
};

const initializeMenuNavStyle = () => {
  const inbox = document.getElementById('menu-inbox-label');
  const today = document.getElementById('menu-today-label');
  const next7 = document.getElementById('menu-next-seven-label');
  if (initialLoadPageLabel === 'Inbox') {
    inbox.style.fontWeight = '700';
  } else if (initialLoadPageLabel === 'Today') {
    today.style.fontWeight = '700';
  } else if (initialLoadPageLabel === 'Next 7 Days') {
    next7.style.fontWeight = '700';
  }
};

const toggleDescriptionPopup = e => {
  const element = document.getElementById(`description-popup`);
  if (!element.style.display) {
    element.style.display = 'none';
  }

  if (element.style.display === 'none') {
    element.style.display = 'flex';
  } else {
    element.style.display = 'none';
  }
};

const populateDescriptionPopup = e => {
  // const popup = document.getElementById('description-popup');
  const date = document.getElementById('description-date');
  const time = document.getElementById('description-time');
  const task = document.getElementById('description-task');
  const descripton = document.getElementById('description-description');
  const priority = document.getElementById('description-priority-content');
  const category = document.getElementById('description-category-content');
  setMyTasksIndex(e);
  const element = myTasks[myTasksIndex];
  console.log(element);

  date.textContent = format(new Date(element.date), 'MMM do, yyyy');
  time.textContent = element.time;
  task.textContent = element.label;
  descripton.textContent = element.description;
  priority.textContent = element.priorityLabel;
  category.textContent = element.categoryLabel;
};

const fillPriorityCircle = e => {
  const id = e.target.id;
  const index = id.replace(/task-label-container-/g, '');
  const tasksOnPage = taskFilterForCurrentPage();
  const myTasksIndex = myTasks.indexOf(tasksOnPage[index]);
  const myTasksElement = myTasks[myTasksIndex];
  const circleElement = document.getElementById(`priority-circle-${index}`);
  const color = circleElement.getAttribute('stroke');
  const colorFill = circleElement.getAttribute('fill');

  if (colorFill == 'none' || myTasksElement.priorityCircleFill === 'none') {
    const newFillColor = colorChange(color);
    circleElement.setAttribute('fill', newFillColor);
    myTasksElement.priorityCircleFill = newFillColor;
  } else if (
    colorFill !== 'none' ||
    myTasksElement.priorityCircleFill !== 'none'
  ) {
    circleElement.setAttribute('fill', 'none');
    myTasksElement.priorityCircleFill = 'none';
  }
  setLocalStorage('myTasks', myTasks);
};

const toggleDisplay = elem => {
  const curDisplayStyle = elem.style.display;

  if (curDisplayStyle === 'none' || curDisplayStyle === '') {
    elem.style.display = 'block';
  } else {
    elem.style.display = '';
  }
};

const displayForm = e => {
  const container = document.getElementById('add-task-form-container');
  const formLabel = document.getElementById('add-task-form-type-label');
  const input = document.getElementById('add-task-input');
  container.style.display = 'flex';
  const id = e.target.id;
  const key = findElementDataKey(e);
  if (id === 'menu-add-task-element-container') {
    formLabel.textContent = 'Add Task';
    input.placeholder = 'Add task name';
    setAddTask(true);
  } else if (id === 'menu-add-project-element-container') {
    formLabel.textContent = 'Add Project';
    input.placeholder = 'Add project name';
    setAddProject(true);
  } else if (id === `task-edit-${key}`) {
    formLabel.textContent = 'Edit Task';
    input.placeholder = 'Edit task name';
    setTaskEdit(true);
  }
};

const handleDeleteEditIconsOpacity1 = e => {
  e.stopPropagation;
  document.getElementById(
    `task-delete-${findElementDataKey(e)}`
  ).style.opacity = 1;
  document.getElementById(
    `task-edit-${findElementDataKey(e)}`
  ).style.opacity = 1;
  document.getElementById(
    `task-description-icon-${findElementDataKey(e)}`
  ).style.opacity = 1;
};

const handleDeleteEditIconsOpacity0 = e => {
  document.getElementById(
    `task-delete-${findElementDataKey(e)}`
  ).style.opacity = 0;
  document.getElementById(
    `task-edit-${findElementDataKey(e)}`
  ).style.opacity = 0;
  document.getElementById(
    `task-description-icon-${findElementDataKey(e)}`
  ).style.opacity = 0;
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
  } else if (e.target.id === 'add-task-dropdown-title-container-project') {
    menu = document.getElementById('option-menu-project');
    icon = document.getElementById('dropdown-icon-project');
  }

  toggleDisplay(menu);
  toggleClass(menu, 'hide');
  toggleClass(icon, 'rotate-90');
};

const populateAddTaskForm = () => {
  const taskToEdit = myTasks[myTasksIndex];
  let {
    date,
    time,
    label,
    description,
    categoryColor,
    priorityColor,
    categoryLabel,
    priorityLabel,
    project,
    priorityCircleFill,
    person,
    avatar,
  } = taskToEdit;

  const formLabel = document.getElementById('add-task-input');
  const formDescription = document.getElementById('add-task-description-input');
  const formCategory = document.getElementById('dropdown-title-category');
  const formPriority = document.getElementById('dropdown-title-priority');
  const formProject = document.getElementById('dropdown-title-project');

  dateSelect();
  setPickerValue(date);
  setCategoryCircleColor(categoryColor);
  setPriorityCircleColor(priorityColor);
  formLabel.value = label;
  formDescription.value = description;
  formCategory.textContent = capitalizeFirstLetter(categoryLabel);
  formPriority.textContent = capitalizeFirstLetter(priorityLabel);
  formProject.textContent = capitalizeFirstLetter(project);
};

const populateTaskWrapper = sortedTasks => {
  
  clearTaskWrapper();
  if (sortedTasks.length === 0) {
    return;
  }
  setLocalStorage('myTasks', myTasks);
  const taskWrapper = document.getElementById('task-wrapper');

  sortedTasks.forEach(task => {
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

  sortedTasks.forEach((task, index) => {
    const dividerTaskDate = document.getElementById(
      `task-divider-content-container-${format(
        new Date(task.date),
        'MM-dd-yyyy'
      )}`
    );
    dividerTaskDate.append(createTask(task, index));
  });
};

const handleContentHeaderLabel = contentLabel => {
  const label = document.getElementById('content-header-label');
  label.textContent = contentLabel;
};

const handleContentHeaderIcon = svg => {
  const icon = document.getElementById('content-header-label-icon');
  icon.innerHTML = svg;
};

const handleView = e => {
  const key = findElementDataKey(e);
  const inboxLabel = document.getElementById('menu-inbox-label');
  const todayLabel = document.getElementById('menu-today-label');
  const next7Label = document.getElementById('menu-next-seven-label');
  const projectLabel = document.getElementById(`project-label-${key}`);
  const children = document.querySelectorAll('.menu-element-label');
  
  for (let item of children) {
    console.log(typeof item);
    item.style.fontWeight = '300';
  }

  sortMyTasksByDate();
  setLocalStorage('myTasks', myTasks);
  setLocalStorage('myProjects', myProjects);
  clearTaskWrapper();
  
  if (e.target.id === 'menu-today-element-container') {
    inboxLabel.style.fontWeight = '300';
    todayLabel.style.fontWeight = '700';
    next7Label.style.fontWeight = '300';
    setCurrentPageView('Today');
    handleContentHeaderLabel('Today');
    populateTaskWrapper(todayTaskFilter());
    handleContentHeaderIcon(svgTodayBig);
  } else if (e.target.id === 'menu-inbox-element-container') {
    inboxLabel.style.fontWeight = '700';
    todayLabel.style.fontWeight = '300';
    next7Label.style.fontWeight = '300';
    setCurrentPageView('Inbox');
    handleContentHeaderLabel('Inbox');
    populateTaskWrapper(inboxTaskSort());
    handleContentHeaderIcon(svgInboxBig);
  } else if (e.target.id === 'menu-next-seven-element-container') {
    inboxLabel.style.fontWeight = '300';
    todayLabel.style.fontWeight = '300';
    next7Label.style.fontWeight = '700';
    setCurrentPageView('Next 7 Days');
    handleContentHeaderLabel('Next 7 Days');
    populateTaskWrapper(next7TaskFilter());
    handleContentHeaderIcon(svgNextSevenBig);
  } else if (e.target.id === `project-menu-element-container-${key}`){
    inboxLabel.style.fontWeight = '300';
    todayLabel.style.fontWeight = '300';
    next7Label.style.fontWeight = '300';
    projectLabel.style.fontWeight = '700';
    // setCurrentPageView('Next 7 Days');
    // handleContentHeaderLabel('Next 7 Days');
    populateTaskWrapper(projectTaskFilter(projectLabel.textContent));
    // handleContentHeaderIcon(svgNextSevenBig);
  }
};

//

// Update

const editTaskToEdit = () => {
  const taskToEdit = myTasks[myTasksIndex];
  const date = getPickerValue();
  const time = getPickerValue();
  const label = document.getElementById('add-task-input').value;
  const description = document.getElementById(
    'add-task-description-input'
  ).value;
  const categoryLabel = document.getElementById(
    'dropdown-title-category'
  ).textContent;
  const priorityLabel = document.getElementById(
    'dropdown-title-priority'
  ).textContent;
  const projectLabel = document.getElementById('dropdown-title-project').textContent;

  if (!date || !taskToEdit) {
    return;
  }

  if (taskEdit) {
    taskToEdit.date = format(new Date(date), 'yyyy-MM-dd HH:mm');
    taskToEdit.time = format(new Date(date), 'p');
    taskToEdit.label = label;
    taskToEdit.description = description;
    taskToEdit.priorityLabel = priorityLabel.toLowerCase().trim();
    taskToEdit.categoryLabel = categoryLabel.toLowerCase().trim();
    taskToEdit.priorityColor = priorityCircleColor;
    taskToEdit.categoryColor = categoryCircleColor;
    taskToEdit.project = projectLabel;
    setLocalStorage('myTasks', myTasks);

    reset();
  }
};

const makeNewTaskItem = () => {
  if (taskEdit) {
    alert('error: taskEdit true, should be false');
    return;
  }
  const date = getPickerValue();
  if (!date) {
    return;
  }
  const time = getPickerValue();
  const label = document.getElementById('add-task-input').value;
  const description = document.getElementById(
    'add-task-description-input'
  ).value;
  const categoryLabel = document.getElementById(
    'dropdown-title-category'
  ).textContent;
  const priorityLabel = document.getElementById(
    'dropdown-title-priority'
  ).textContent;
  const projectLabel = document.getElementById(
    'dropdown-title-project'
  ).textContent;
  

  const taskObject = new Task(
    date,
    format(new Date(time), 'p'),
    label,
    description,
    categoryCircleColor,
    priorityCircleColor,
    categoryLabel.toLowerCase().trim(),
    priorityLabel.toLowerCase().trim(),
    projectLabel
  );

  myTasks.push(taskObject);
  sortMyTasksByDate(); //sorts and formats to ISO
  setLocalStorage('myTasks', myTasks);
  reset();
};

const makeNewProjectItem = () => {
  if (taskEdit) {
    alert('error: taskEdit true, should be false');
    return;
  }
  const date = getPickerValue();
  if (!date) {
    return;
  }
  const time = getPickerValue();
  const name = document.getElementById('add-task-input').value;
  const description = document.getElementById(
    'add-task-description-input'
  ).value;
  const categoryLabel = document.getElementById(
    'dropdown-title-category'
  ).textContent;
  const priorityLabel = document.getElementById(
    'dropdown-title-priority'
  ).textContent;

  const project = new Project(
    name,
    date,
    format(new Date(time), 'p'),
    description,
    categoryCircleColor,
    priorityCircleColor,
    categoryLabel.toLowerCase().trim(),
    priorityLabel.toLowerCase().trim()
  );
  myProjects.push(project);
  sortMyProjectsByDate(); //sorts and formats to ISO
  setLocalStorage('myProjects', myProjects);
  reset();
};

const reset = () => {
  updateTaskContent();
  updateMenuCount();
  updateProjectMenu();
  clearAddTaskForm();
  setMyTasksIndex();
  setTaskEdit(false);
  setAddProject(false);
  setAddTask(false);
  setPriorityCircleColor('');
  setCategoryCircleColor('');
};

const updateTaskContent = () => {
  if (currentPageView === 'Inbox') {
    populateTaskWrapper(inboxTaskSort());
  } else if (currentPageView === 'Today') {
    populateTaskWrapper(todayTaskFilter());
  } else if (currentPageView === 'Next 7 Days') {
    populateTaskWrapper(next7TaskFilter());
  }
};

const updateMenuCount = () => {
  document.getElementById('menu-inbox-count').textContent =
  inboxTaskSort().length;
  document.getElementById('menu-today-count').textContent =
  todayTaskFilter().length;
  document.getElementById('menu-next-seven-count').textContent =
  next7TaskFilter().length;
};

const updateProjectMenu = () => {
  const menu = document.getElementById('menu-project-container');
  if (menu.firstElementChild) {
    while (menu.firstElementChild) {
      menu.firstElementChild.remove();
    }
  }
  
  setLocalStorage('myProjects', myProjects);
  myProjects.forEach((project, index) => {
    menu.appendChild(createElementMenuAddProject(project, index));
  });
};

//

// Remove

const clearTaskWrapper = () => {
  const taskWrapper = document.getElementById('task-wrapper');
  if (taskWrapper) {
    while (taskWrapper.firstElementChild) {
      taskWrapper.firstElementChild.remove();
    }
  }
};

const clearAddTaskForm = () => {
  document.getElementById('add-task-input').value = '';
  document.getElementById('task-date').value = '';
  document.getElementById('add-task-description-input').value = '';
  document.getElementById('dropdown-title-category').textContent = 'Category';
  document.getElementById('dropdown-title-priority').textContent = 'Priority';
  document.getElementById('dropdown-title-priority').textContent = 'Project';
  document.getElementById('add-task-form-container').style.display = 'none';
  setPickerValue(null);
};

const deleteTask = () => {
  myTasks.splice(myTasks[myTasksIndex], 1);
  updateTaskContent();
  updateMenuCount();
  // updateProjectMenuCount(); //keep for future addition to program
  setMyTasksIndex();
};

//

//Utility

const initializeContent = () => {
  populateTaskWrapper(inboxTaskSort());
  initializeMenuNavStyle();
  updateMenuCount();
  updateProjectMenu();
  setLocalStorage('myTasks', myTasks);
  setLocalStorage('myProjects', myProjects);
  setLocalStorage('isFirstTime', isFirstTime);
  setCurrentPageView(initialLoadPageLabel);

  if (isFirstTime.length <= 0) {
    setIsFirstTime(false);
  }
  // createDefaultVariables();
};

const toSpinalCase = string => {
  if (string.split(' ').length > 1) {
    return `${string.split(' ')[0].toLowerCase()}-${string
      .split(' ')[1]
      .toLowerCase()}`;
  } else {
    return string.toLowerCase();
  }
};

const colorChange = string => {
  let str = string
    .split('')
    .filter(i => !isNaN(parseInt(i)) || i === ' ')
    .join('')
    .split(' ');
  let newLightness = parseInt(str[2]) - 10;
  let newOpacity = parseInt(str[3]) - 0.75;

  return `hsla(${str[0]}, ${str[1]}%, ${newLightness}%, ${newOpacity.toFixed(
    2
  )})`;
};

const submitHandler = () => {
  if (!taskEdit && !addProject & addTask) {
    makeNewTaskItem();
    console.log('addTask');
  } else if (!taskEdit && addProject & !addTask) {
    makeNewProjectItem();
    console.log('addProject');
  } else if (taskEdit && !addProject & !addTask) {
    editTaskToEdit();
    console.log('taskEdit');
  }
};

const capitalizeFirstLetter = string => {
  return string[0].toUpperCase() + string.slice(1);
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

export {
  initializeMenuNavStyle,
  toggleDescriptionPopup,
  handleContentHeaderLabel,
  handleContentHeaderIcon,
  updateTaskContent,
  updateProjectMenu,
  makeNewTaskItem,
  makeNewProjectItem,
  editTaskToEdit,
  fillPriorityCircle,
  updateMenuCount,
  clearTaskWrapper,
  toggleConfirm,
  toggleOverlay,
  deleteTask,
  findElementDataKey,
  populateAddTaskForm,
  populateDescriptionPopup,
  handleDeleteEditIconsOpacity1,
  handleDeleteEditIconsOpacity0,
  clearAddTaskForm,
  capitalizeFirstLetter,
  displayForm,
  handleOptionSelected,
  initializeContent,
  submitHandler,
  toggleDisplay,
  toSpinalCase,
  toggleMenuDisplay,
  toggleClass,
  handleView,
  populateTaskWrapper,
};
