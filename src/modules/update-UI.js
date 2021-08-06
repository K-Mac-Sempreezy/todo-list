import { next7TaskFilter, todayTaskFilter } from "./edit-task.js";
import { setCurrentPageView } from './edit-task.js';

const updateContentLabel = (contentLabel) => {
  const label = document.getElementById('content-header-label');
  label.textContent = contentLabel;
}

const updateTasks = () => {
  const taskWrapper = document.getElementById('task-wrapper');
  const date = document.getElementById('task-date').value;
  const label = document.getElementById('add-task-input').value;
  const priorityColor = '#236abd'; //default color for now
  const description = document.getElementById(
    'add-task-description-input'
  ).value;
  const category = document.getElementById('dropdown-title').textContent;

  if (taskToEdit) {
    taskToEdit.date = date;
    taskToEdit.label = label;
    taskToEdit.priorityColor = priorityColor;
    taskToEdit.description = description;
    taskToEdit.category = category.toLowerCase().trim();
    taskToEdit.currentMyTasksIndex = myTasks.indexOf(taskToEdit);
    taskToEdit.edit = false;
    setTaskToEdit('');
  } else {
    const taskObject = new Task(
      date,
      priorityColor,
      label,
      description,
      category
    );

    myTasks.push(taskObject);
    localStorage.setItem('myTasks', JSON.stringify(myTasks));
  }

  updateTaskContent();
  addTaskFormCancelHandler();
};

const updateTaskContent = () => {
  const contentWrapper = document.getElementById('content-wrapper');
  const taskWrapper = document.getElementById('task-wrapper');
  localStorage.setItem('myTasks', JSON.stringify(myTasks));

  while (taskWrapper.firstElementChild) {
    taskWrapper.firstElementChild.remove();
  }

  if (currentPageView === 'Inbox') {
    const tasks = myTasks;
    tasks.forEach((task, index) => {
      taskWrapper.appendChild(createTask(task, index));
    });
    contentWrapper.appendChild(createContentHeader('Inbox'));
  } else if (currentPageView === 'Today') {
    const tasks = todayTaskFilter();
    tasks.forEach((task, index) => {
      taskWrapper.appendChild(createTask(task, index));
    });
    contentWrapper.appendChild(createContentHeader('Today'));
  } else if (currentPageView === 'Next 7 Days') {
    const tasks = next7TaskFilter();
    tasks.forEach((task, index) => {
      taskWrapper.appendChild(createTask(task, index));
    });
    contentWrapper.appendChild(createContentHeader('Next 7 Days'));
  }
};

const updateMenu = e => {
  const inboxLabel = document.getElementById('menu-inbox-label');
  const todayLabel = document.getElementById('menu-today-label');
  const next7Label = document.getElementById('menu-seven-label');

  if (e.target.id === 'today-container') {
    inboxLabel.style.fontWeight = '300';
    todayLabel.style.fontWeight = '700';
    next7Label.style.fontWeight = '300';
    setCurrentPageView('Today');
  } else if (e.target.id === 'inbox-container') {
    inboxLabel.style.fontWeight = '700';
    todayLabel.style.fontWeight = '300';
    next7Label.style.fontWeight = '300';
    setCurrentPageView('Inbox');
  } else if (e.target.id === 'next-seven-container') {
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
  document.getElementById('menu-next7-count').textContent = next7Count;
};

const clearTaskWrapper = () => {
  const taskWrapper = document.getElementById('task-wrapper');
  if(taskWrapper) {
    while (taskWrapper.firstElementChild) {
      taskWrapper.firstElementChild.remove();
    }
  };
};

const deleteTask = (e) => {
  const elementIndex = findElementDataKey(e);
  const element = document.getElementById(`task-element-${elementIndex}`);
  element.remove();
  myTasks.splice(elementIndex, 1);
  localStorage.setItem('myTasks', JSON.stringify(myTasks));
}

const appendTasks = (tasks) => {
  const taskWrapper = document.getElementById('task-wrapper');
      tasks.forEach((task, index) => {
      taskWrapper.appendChild(createTask(task, index));
    });
}

const populateAddTaskForm = (taskToEdit) => {
  let {
    date,
    priorityColor,
    label,
    category,
    currentMyTasksIndex,
    description,
    person,
    avatar,
  } = taskToEdit;
  console.log(taskToEdit);

  const addTaskForm = document.getElementById('add-task-form-container');
  const formDate = document.getElementById('task-date');
  const formLabel = document.getElementById('add-task-input');
  const formDescription = document.getElementById('add-task-description-input');
  const formCategory = document.getElementById('dropdown-title');

  addTaskForm.style.display = 'flex';
  formDate.value = date;
  formLabel.value = label;
  formDescription.value = description;
  formCategory.textContent = capitalizeFirstLetter(category);
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

export {
  updateContentLabel,
  updateTasks,
  updateMenu,
  updateMenuCount,
  clearTaskWrapper,
  deleteTask,
  appendTasks,
  populateAddTaskForm,
  handleDeleteEditIconsOpacity1,
  handleDeleteEditIconsOpacity0,
};