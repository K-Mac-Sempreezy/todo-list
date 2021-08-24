import {
  inboxTaskSort,
  next7TaskFilter,
  todayTaskFilter,
  sortMyTasksByDate,
  taskFilterForCurrentPage,
} from './edit-task.js';
import {
  addProject,
  addTask,
  categoryCircleColor,
  clearMyTasksToDelete,
  currentPageView,
  // defaultTasks,
  projectEdit,
  initialLoadPageLabel,
  isFirstTime,
  myProjects,
  myProjectsIndex,
  myTasks,
  myTasksIndex,
  myTasksToDelete,
  priorityCircleColor,
  setAddProject,
  setAddTask,
  setCategoryCircleColor,
  setCurrentPageView,
  setIsFirstTime,
  setMyProjectsIndex,
  setMyTasksIndex,
  setMyTasksToDelete,
  setPriorityCircleColor,
  setLocalStorage,
  setProjectEdit,
  setProjectName,
  projectName,
  setTaskEdit,
  taskEdit,
  defaultTasks,
} from './variables.js';
import {
  svgInboxBig,
  svgNextSevenBig,
  svgTodayBig,
  svgProjectIcon,
} from './svg-variables.js';
import { projectTaskFilter, sortMyProjectsByDate } from './edit-project.js';
import { createTaskDateDividerElement, createTask } from './create-task.js';
import { Task, Project } from './class-templates.js';
import { format } from 'date-fns';
import { dateSelect, getPickerValue, setPickerValue } from './date';
import { createElementMenuProject } from './create-menu.js';
import { createDropdownOptions } from './create-add-task-form.js';
import { createElement } from './create-element.js';

//
//
// Display

const toggleOverlay = (e) => {
  const id = e.target.id;
  const overlay = document.getElementById('overlay');

  if (!overlay.style.display) {
    overlay.style.display = 'none';
  }
  if (id.includes('task') || id.includes('project')){
    overlay.style.display = 'block';
  } else if (id.includes('confirm')) {
    overlay.style.display = 'none';
  }
};

const toggleConfirm = e => {
  const id = e.target.id;
  const popup = document.getElementById('confirm-container');
  const text = document.getElementById('confirm-label');

  if (!popup.style.display) {
    popup.style.display = 'none';
  }

  if (id.includes('task')) {
    if (popup.style.display === 'none') {
      popup.style.display = 'flex';
      setMyTasksIndex(e);
      setMyProjectsIndex();
      console.log(isNaN(myProjectsIndex))
      text.textContent = 'Are you sure you want to delete this task?';
    }
  } else if (id.includes('project')) {
    if (popup.style.display === 'none') {
      popup.style.display = 'flex';
      setMyProjectsIndex(e);
      setMyTasksIndex();
      console.log(myProjectsIndex)
      text.textContent = `This will delete all tasks in project. Press delete to confirm.`;
    }
  } else if (id.includes('confirm')) {
    popup.style.display = 'none';
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
  e.stopPropagation();
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
  let element;
  const id = e.target.id;
  const date = document.getElementById('description-date');
  const time = document.getElementById('description-time');
  const task = document.getElementById('description-task');
  const descripton = document.getElementById('description-description');
  const priority = document.getElementById('description-priority-content');
  const category = document.getElementById('description-category-content');
  const project = document.getElementById('description-project-content');
  
  if (id.includes('task')) {
    setMyTasksIndex(e);
    element = myTasks[myTasksIndex];
    console.log(element);
    date.textContent = format(new Date(element.date), 'MMM do, yyyy');
    time.textContent = element.time;
    task.textContent = element.label;
    descripton.textContent = element.description;
    priority.textContent = element.priorityLabel;
    category.textContent = element.categoryLabel;
    project.textContent = element.project.toLowerCase();
  } else if (id.includes('project')){
    setMyProjectsIndex(e);
    element = myProjects[myProjectsIndex];
    console.log(element)
    date.textContent = format(new Date(element.date), 'MMM do, yyyy');
    time.textContent = element.time;
    task.textContent = element.name;
    descripton.textContent = element.description;
    priority.textContent = element.priorityLabel;
    category.textContent = element.categoryLabel;
    project.textContent = ' ... ';
  }
};

const toggleDisplay = elem => {
  const curDisplayStyle = elem.style.display;

  if (curDisplayStyle === 'none' || curDisplayStyle === '') {
    elem.style.display = 'block';
  } else {
    elem.style.display = '';
  }
};

const toggleDropdownMenuDisplay = e => {
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

const displayForm = e => {
  createDropdownOptions();
  const id = e.target.id;
  const key = findElementDataKey(e);
  const overlay = document.getElementById('overlay');
  const container = document.getElementById('add-task-form-container');
  const formLabel = document.getElementById('add-task-form-type-label');
  const input = document.getElementById('add-task-input');
  const projectOptions = document.getElementById(
    'add-task-dropdown-container-project'
  );
  const projectClassList = projectOptions.getAttribute('class');

  container.style.display = 'flex';
  overlay.style.display = 'flex';

  if (id === 'menu-add-task-element-container') {
    if (projectClassList.includes('display-none')) {
      toggleClass(projectOptions, 'display-none');
    }
    formLabel.textContent = 'Add Task';
    input.placeholder = 'Add task name';
    setAddTask(true);
  } else if (id === 'menu-add-project-element-container') {
    if (!projectClassList.includes('display-none')) {
      toggleClass(projectOptions, 'display-none');
    }
    formLabel.textContent = 'Add Project';
    input.placeholder = 'Add project name';
    setAddProject(true);
  } else if (id === `task-edit-${key}`) {
    if (projectClassList.includes('display-none')) {
      toggleClass(projectOptions, 'display-none');
    }
    formLabel.textContent = 'Edit Task';
    input.placeholder = 'Edit task name';
    setTaskEdit(true);
  } else if (id === `menu-project-edit-container-${key}`) {
    if (!projectClassList.includes('display-none')) {
      toggleClass(projectOptions, 'display-none');
    }
    formLabel.textContent = 'Edit Project';
    input.placeholder = 'Edit Project Name';
    setProjectEdit(true);
  }
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
  e.stopPropagation();
  const inboxLabel = document.getElementById('menu-inbox-label');
  const todayLabel = document.getElementById('menu-today-label');
  const next7Label = document.getElementById('menu-next-seven-label');
  const allLabels = document.querySelectorAll('.menu-element-label');
  const key = findElementDataKey(e);
  const projectLabel = document.getElementById(`project-label-${key}`);
  const id = e.target.id;

  for (let item of allLabels) {
    item.style.fontWeight = '300';
  }
  sortMyTasksByDate();
  setLocalStorage('myTasks', myTasks);
  setLocalStorage('myProjects', myProjects);
  clearTaskWrapper();

  if (id.includes('today')) {
    todayLabel.style.fontWeight = '700';
    setCurrentPageView('Today', 'Menu');
    handleContentHeaderLabel('Today');
    populateTaskWrapper(todayTaskFilter());
    handleContentHeaderIcon(svgTodayBig);
  } else if (id.includes('inbox')) {
    inboxLabel.style.fontWeight = '700';
    setCurrentPageView('Inbox', 'Menu');
    handleContentHeaderLabel('Inbox');
    populateTaskWrapper(inboxTaskSort());
    handleContentHeaderIcon(svgInboxBig);
  } else if (id.includes('seven')) {
    next7Label.style.fontWeight = '700';
    setCurrentPageView('Next 7 Days', 'Menu');
    handleContentHeaderLabel('Next 7 Days');
    populateTaskWrapper(next7TaskFilter());
    handleContentHeaderIcon(svgNextSevenBig);
  } else if (id.includes('project')) {
    projectLabel.style.fontWeight = '700';
    setCurrentPageView(projectLabel.textContent, 'Project');
    handleContentHeaderLabel(projectLabel.textContent);
    populateTaskWrapper(projectTaskFilter(projectLabel.textContent));
    handleContentHeaderIcon(svgProjectIcon);
  }
};

const handleDeleteEditIconsOpacity1 = e => {
  const id = e.target.parentNode.id;
  const key = findElementDataKey(e);
  if (id.includes('task')) {
    document.getElementById(`task-delete-${key}`).style.opacity = 1;
    document.getElementById(`task-edit-${key}`).style.opacity = 1;
    document.getElementById(`task-description-icon-${key}`).style.opacity = 1;
  } else if (id.includes('project')) {
    document.getElementById(
      `menu-project-icons-container-${key}`
    ).style.opacity = 1;
  }
};

const handleDeleteEditIconsOpacity0 = e => {
  const id = e.target.parentNode.id;
  const key = findElementDataKey(e);
  if (id.includes('task')) {
    document.getElementById(`task-delete-${key}`).style.opacity = 0;
    document.getElementById(`task-edit-${key}`).style.opacity = 0;
    document.getElementById(`task-description-icon-${key}`).style.opacity = 0;
  } else if (id.includes('menu')) {
    document.getElementById(
      `menu-project-icons-container-${key}`
    ).style.opacity = 0;
  }
};

const populateForm = (objectCategory, number) => {
  createDropdownOptions();
  let objectToEdit;
  if (objectCategory === 'Project') {
    objectToEdit = myProjects[number];
    let {
      name,
      date,
      time,
      description,
      categoryColor,
      priorityColor,
      categoryLabel,
      priorityLabel,
    } = objectToEdit;

    const formLabel = document.getElementById('add-task-input');
    const formDescription = document.getElementById(
      'add-task-description-input'
    );
    const formCategory = document.getElementById('dropdown-title-category');
    const formPriority = document.getElementById('dropdown-title-priority');
    // const formProject = document.getElementById('dropdown-title-project');

    dateSelect();
    setProjectName(name);
    setPickerValue(date);
    setCategoryCircleColor(categoryColor);
    setPriorityCircleColor(priorityColor);
    formLabel.value = name;
    formDescription.value = description;
    formCategory.textContent = capitalizeFirstLetter(categoryLabel);
    formPriority.textContent = capitalizeFirstLetter(priorityLabel);
    // formProject.textContent = capitalizeFirstLetter(project);
  } else if (objectCategory === 'Task') {
    objectToEdit = myTasks[number];
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
    } = objectToEdit;
    const formLabel = document.getElementById('add-task-input');
    const formDescription = document.getElementById(
      'add-task-description-input'
    );
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
  }
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

//
//
// Update

const editTaskToEdit = () => {
  const objectToEdit = myTasks[myTasksIndex];
  const date = getPickerValue();
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
  document.getElementById('');

  if (!date || !objectToEdit) {
    return;
  }

  if (taskEdit) {
    objectToEdit.date = format(new Date(date), 'yyyy-MM-dd HH:mm');
    objectToEdit.time = format(new Date(date), 'p');
    objectToEdit.label = label;
    objectToEdit.description = description;
    objectToEdit.priorityLabel = priorityLabel.toLowerCase().trim();
    objectToEdit.categoryLabel = categoryLabel.toLowerCase().trim();
    objectToEdit.priorityColor = priorityCircleColor;
    objectToEdit.categoryColor = categoryCircleColor;
    objectToEdit.project = projectLabel;
    sortMyTasksByDate();
    setLocalStorage('myTasks', myTasks);

    reset();
  }
};

const editProjectToEdit = () => {
  const objectToEdit = myProjects[myProjectsIndex];
  const date = getPickerValue();
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
  // const projectLabel = document.getElementById(
  //   'dropdown-title-project'
  // ).textContent;
  document.getElementById('');

  if (!date || !objectToEdit) {
    return;
  }

  if (projectEdit) {
    objectToEdit.date = format(new Date(date), 'yyyy-MM-dd HH:mm');
    objectToEdit.time = format(new Date(date), 'p');
    objectToEdit.name = name;
    objectToEdit.description = description;
    objectToEdit.priorityLabel = priorityLabel.toLowerCase().trim();
    objectToEdit.categoryLabel = categoryLabel.toLowerCase().trim();
    objectToEdit.priorityColor = priorityCircleColor;
    objectToEdit.categoryColor = categoryCircleColor;
    // objectToEdit.project = projectLabel;
    setLocalStorage('myProjects', myProjects);
    updateTasksProjectName(name);
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
  toggleClass(
    document.getElementById('add-task-dropdown-container-project'),
    'display-none'
  );
  reset();
};

const updateTasksProjectName = newProjectName => {
  myTasks
    .filter(task => task.project === projectName)
    .forEach(task => (task.project = newProjectName));
  setProjectName(null);
};

const reset = () => {
  clearForm();
  clearMyTasksToDelete();
  setAddProject(false);
  setAddTask(false);
  setCategoryCircleColor('');
  setMyProjectsIndex();
  setMyTasksIndex();
  setPriorityCircleColor('');
  setTaskEdit(false);
  setProjectEdit(false);
  updateMenuCount();
  updateProjectMenu();
  updateTaskContent();
  setLocalStorage('myTasks', myTasks);
  setLocalStorage('myProjects', myProjects);
  createDropdownOptions();
};

const updateTaskContent = () => {
  const inboxLabel = document.getElementById('menu-inbox-label');
  const todayLabel = document.getElementById('menu-today-label');
  const next7Label = document.getElementById('menu-next-seven-label');

  if (currentPageView.type === 'Menu') {
    if (currentPageView.pageLabel === 'Inbox') {
      populateTaskWrapper(inboxTaskSort());
    } else if (currentPageView.pageLabel === 'Today') {
      populateTaskWrapper(todayTaskFilter());
    } else if (currentPageView.pageLabel === 'Next 7 Days') {
      populateTaskWrapper(next7TaskFilter());
    }
  } else if (currentPageView.type === 'Project') {
    populateTaskWrapper(projectTaskFilter(currentPageView.pageLabel));
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
  const subheader = document.getElementById('menu-project-subheader');
  if (menu.firstElementChild) {
    while (menu.firstElementChild) {
      menu.firstElementChild.remove();
    }
  }

  setLocalStorage('myProjects', myProjects);
  myProjects.forEach((project, index) => {
    menu.appendChild(createElementMenuProject(project, index));
  });

  if (menu.firstElementChild) {
    if (subheader.getAttribute('class').includes('display-none')) {
      toggleClass(subheader, 'display-none');
    }
  }
};

//
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

const clearForm = () => {
  document.getElementById('add-task-input').value = '';
  document.getElementById('task-date').value = '';
  document.getElementById('add-task-description-input').value = '';
  document.getElementById('dropdown-title-category').textContent = 'Category';
  document.getElementById('dropdown-title-priority').textContent = 'Priority';
  document.getElementById('dropdown-title-project').textContent = 'Project';
  document.getElementById('add-task-form-container').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
  toggleClass(
    document.getElementById('add-task-dropdown-container-project'),
    'display-none'
  );
  setPickerValue(null);
};

const deleteHandler = () => {
  if (!isNaN(myProjectsIndex) && isNaN(myTasksIndex)) {
    deleteProject();
  } else if (isNaN(myProjectsIndex) && !isNaN(myTasksIndex)) {
    deleteTask();
  }
};

const deleteProject = () => {
  const projectName = document.getElementById(
    `project-label-${myProjectsIndex}`
  ).textContent;

  myTasks.forEach(task => {
    if (task.project === projectName) {
      setMyTasksToDelete(myTasks.indexOf(task));
    } else {
      return;
    }
  });

  for (let i = myTasksToDelete.length - 1; i >= 0; i--) {
    myTasks.splice(myTasksToDelete[i], 1);
  }
  console.log(myProjectsIndex)
  myProjects.splice(myProjectsIndex, 1);

  reset();
};

const deleteTask = () => {
  if (myTasks.length <= 1) {
    myTasks.splice(0, myTasks.length);
  } else {
    myTasks.splice(myTasksIndex, 1)
  }
  reset();
};

//
//
//Utility

const toggleHelperBox = e => {
  const hoverBox = document.getElementById('hover-helper-box');
  if (hoverBox) {
    hoverBox.remove();
  } else {
    if (e.target.dataset.hover) {
      setTimeout(function () {
        const hoverBox = createElement('div', {
          id: 'hover-helper-box',
          class: 'hover',
        });
        e.target.appendChild(hoverBox);
        hoverBox.textContent = e.target.dataset.hover;
        hoverBox.style.opacity = 1;
      }, 2000);
    }
  }
};

const initializeContent = () => {
  setLocalStorage('myTasks', myTasks);
  setLocalStorage('myProjects', myProjects);
  setLocalStorage('isFirstTime', isFirstTime);
  setCurrentPageView(initialLoadPageLabel, 'Menu');
  populateTaskWrapper(inboxTaskSort());
  initializeMenuNavStyle();
  updateMenuCount();
  dateSelect();
  createDropdownOptions();
  updateProjectMenu();

  if (isFirstTime.length <= 0) {
    setIsFirstTime(false);
    defaultTasks.forEach(task => myTasks.push(task));
    reset();
  } 
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
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';

  if (!taskEdit && !addProject && !projectEdit && addTask) {
    makeNewTaskItem();
    console.log('addTask');
  } else if (!taskEdit && addProject && !projectEdit && !addTask) {
    makeNewProjectItem();
    console.log('addProject');
  } else if (taskEdit && !addProject && !projectEdit && !addTask) {
    editTaskToEdit();
    console.log('taskEdit');
  } else if (!taskEdit && !addProject && projectEdit && !addTask) {
    editProjectToEdit();
    console.log('projectEdit');
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
  const projectClassList = elem.getAttribute('class');
  if (projectClassList.includes(className)) {
    const newClasses = projectClassList.replace(className, '').trim();
    elem.setAttribute('class', newClasses);
  } else {
    const newClassList = `${projectClassList} ${className}`;
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
};

export {
  capitalizeFirstLetter,
  clearTaskWrapper,
  clearForm,
  deleteHandler,
  deleteTask,
  deleteProject,
  displayForm,
  editTaskToEdit,
  fillPriorityCircle,
  findElementDataKey,
  handleContentHeaderLabel,
  handleContentHeaderIcon,
  handleDeleteEditIconsOpacity1,
  handleDeleteEditIconsOpacity0,
  handleOptionSelected,
  handleView,
  initializeContent,
  initializeMenuNavStyle,
  makeNewTaskItem,
  makeNewProjectItem,
  populateForm,
  populateDescriptionPopup,
  populateTaskWrapper,
  submitHandler,
  toggleDescriptionPopup,
  toggleConfirm,
  toggleOverlay,
  toggleDisplay,
  toSpinalCase,
  toggleDropdownMenuDisplay,
  toggleClass,
  updateTaskContent,
  updateProjectMenu,
  updateMenuCount,
  reset,
  toggleHelperBox,
};
