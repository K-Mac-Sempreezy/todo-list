import { createContentHeader } from './content-header.js';
import { myTasks, Task } from './initial-load';
import { createAddTaskForm, addTaskFormCancelHandler } from './add-task-form.js';
import format from 'date-fns/format';

const populateTasks = () => {
  const date = document.getElementById('task-date').value;
  const label = document.getElementById('add-task-input').value;
  const priorityColor = '#236abd'; //default color for now
  const categoryColor = '#236abd'; //default color for now
  const description = document.getElementById(
    'add-task-description-input'
  ).value;
  const category = document
    .getElementById('dropdown-title')
    .textContent.toLowerCase();

  const taskObject = new Task(
    date,
    priorityColor,
    label,
    description,
    category,
    categoryColor
  );

  const taskWrapper = document.getElementById('task-wrapper');
  while (taskWrapper.firstElementChild) {
    taskWrapper.firstElementChild.remove();
  }
  myTasks.push(taskObject);
  myTasks
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach((task, index) => taskWrapper.appendChild(createTask(task, index)));
  localStorage.setItem('myTasks', JSON.stringify(myTasks));
  addTaskFormCancelHandler();
};

const createTaskContent = (e) => {
  const contentWrapper = document.getElementById('content-wrapper');
  const taskWrapper = document.getElementById('task-wrapper');

  while (contentWrapper.firstElementChild) {
    contentWrapper.firstElementChild.remove();
  }

  while (taskWrapper.firstElementChild) {
    taskWrapper.firstElementChild.remove();
  }

  if (e.target.id === 'inbox-container') {
    const tasks = myTasks;
    tasks.forEach((task) => {
      taskWrapper.appendChild(createTask(task));
    });
    contentWrapper.appendChild(createContentHeader('Inbox'));
  } else if (e.target.id === 'today-container') {
    const tasks = myTasks.filter(
      (task) =>
        format(new Date(task.date), 'MMM do yyyy') ===
        format(new Date(), 'MMM do yyyy')
    );
    tasks.forEach((task) => {
      taskWrapper.appendChild(createTask(task));
    });
    contentWrapper.appendChild(createContentHeader());
  } else if (e.target.id === 'next-seven-container') {
    const tasks = myTasks.filter(
      (task) =>
        format(new Date(task.date), 'MMM do yyyy') ===
        format(new Date(), 'MMM do yyyy')
    );
    tasks.forEach((task) => {
      taskWrapper.appendChild(createTask(task));
    });
  }

  contentWrapper.appendChild(createAddTaskForm());
  contentWrapper.appendChild(taskWrapper);
};;

const createTaskWrapper = () => {
  const taskWrapper = document.createElement('div');
  taskWrapper.setAttribute('id', 'task-wrapper');
  return taskWrapper;
};

const createTask = (taskObject, index) => {
  let {date, priorityColor, label, category, categoryColor, person, avatar} =
    taskObject;
  const taskElement = createTaskElement(index);
  const taskLabelContainer = createTaskLabelContainer(
    priorityColor,
    label,
    index
  );
  const taskAttributes = createTaskAttributes(
    category,
    categoryColor,
    person,
    avatar,
    index
  );

  taskElement.appendChild(taskLabelContainer);
  taskElement.appendChild(taskAttributes);
  return taskElement;
};

const createTaskElement = (index) => {
  const taskElement = document.createElement('div');
  taskElement.setAttribute('class', 'task-element');
  taskElement.setAttribute('id', `task-element-${index}`);
  taskElement.dataset.key = index;
  taskElement.addEventListener('mouseover', opacity1);
  taskElement.addEventListener('mouseleave', opacity0);
  return taskElement;
};

const opacity1 = (e) => {
  document.getElementById(
    `task-delete-${findElementDataKey(e)}`
  ).style.opacity = 1;
  document.getElementById(
    `task-edit-${findElementDataKey(e)}`
  ).style.opacity = 1;
};

const opacity0 = (e) => {
  document.getElementById(
    `task-delete-${findElementDataKey(e)}`
  ).style.opacity = 0;
  document.getElementById(
    `task-edit-${findElementDataKey(e)}`
  ).style.opacity = 0;
};

const findElementDataKey = (e) => {
  let key = e.target.dataset.key;
  return key;
};

const createTaskLabelContainer = (priority, label, index) => {
  const taskLabelContainer = document.createElement('div');
  taskLabelContainer.classList.add('task-label-container');
  taskLabelContainer.dataset.key = index;

  const priorityCircle = createPriority(priority, index);
  const taskLabel = createLabel(label, index);

  taskLabelContainer.appendChild(priorityCircle);
  taskLabelContainer.appendChild(taskLabel);
  return taskLabelContainer;
};

const createTaskAttributes = (
  category,
  categoryColor,
  person,
  avatar,
  index
) => {
  const taskCategoryContainer = createTaskCategoryContainer(category, index);
  const taskStatusContainer = createStatusContainer(index);
  const status = createStatus(categoryColor, index);
  const taskPersonContainer = createPersonContainer(person, index);
  const taskAvatarContainer = createTaskAvatarContainer(avatar, index);
  const taskAttributesContainer = createTaskAttributesContainer(index);
  const taskDeleteContainer = createTaskDeleteContainer(index);
  const taskEditContainer = createTaskEditContainer(index);

  taskStatusContainer.appendChild(status);
  taskAttributesContainer.appendChild(taskEditContainer);
  taskAttributesContainer.appendChild(taskDeleteContainer);
  taskAttributesContainer.appendChild(taskCategoryContainer);
  taskAttributesContainer.appendChild(taskPersonContainer);
  taskAttributesContainer.appendChild(taskStatusContainer);
  taskAttributesContainer.appendChild(taskAvatarContainer);
  return taskAttributesContainer;
};

/**
 * Creates a label
 * @param {string} label for the button
 * @returns the label
 */
const createLabel = (label, index) => {
  const taskLabel = document.createElement('p');
  taskLabel.setAttribute('id', `task-label-${index}`);
  taskLabel.dataset.key = index;
  taskLabel.textContent = label;
  return taskLabel;
};

const createPriority = (priorityColor, index) => {
  const circle = createCircle(priorityColor, index);
  const circleContainer = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
    );
  circleContainer.classList.add('task-priority');
  circleContainer.setAttribute('id', `task-priority-${index}`);
  circleContainer.dataset.key = index;
  circleContainer.appendChild(circle);
  return circleContainer;
};

const createCircle = (priorityColor, index) => {
  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  circle.setAttributeNS(null, 'id', `priority-circle-${index}`);
  circle.setAttributeNS(null, 'class', 'priority-circle');
  circle.setAttributeNS(null, 'cx', 12);
  circle.setAttributeNS(null, 'cy', 25);
  circle.setAttributeNS(null, 'r', 10);
  circle.setAttributeNS(null, 'fill', 'none');
  circle.setAttributeNS(null, 'stroke', priorityColor);
  circle.setAttributeNS(null, 'stroke-width', '2px');
  circle.dataset.key = index;
  return circle;
};

const createTaskCategoryContainer = (category, index) => {
  const categoryContainer = document.createElement('div');
  categoryContainer.classList.add('task-category-container');
  categoryContainer.setAttribute('id', `task-category-${index}`);
  categoryContainer.textContent = category;
  categoryContainer.dataset.key = index;
  return categoryContainer;
};

const createStatusContainer = (index) => {
  const taskStatusContainer = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  taskStatusContainer.setAttribute('class', 'task-icon-container status');
  taskStatusContainer.setAttribute('id', `task-status-${index}`);
  taskStatusContainer.dataset.key = index;
  return taskStatusContainer;
};

const createStatus = (categoryColor, index) => {
  const status = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  status.setAttributeNS(null, 'class', 'default-circle');
  status.setAttributeNS(null, 'cx', 25);
  status.setAttributeNS(null, 'cy', 25);
  status.setAttributeNS(null, 'r', 5);
  status.setAttributeNS(null, 'fill', categoryColor);
  status.setAttributeNS(null, 'stroke', 'none');
  status.dataset.key = index;
  return status;
};

const createPersonContainer = (person, index) => {
  const taskPersonContainer = document.createElement('div');
  taskPersonContainer.setAttribute('class', 'task-icon-container person'); //doesn't contain person element yet
  taskPersonContainer.setAttribute('id', `task-person-${index}`);
  taskPersonContainer.dataset.key = index;
  if (!person) {
    taskPersonContainer.style.display = 'none';
  }
  return taskPersonContainer;
};

const createTaskAvatarContainer = (avatar, index) => {
  const taskAvatarContainer = document.createElement('div');
  taskAvatarContainer.setAttribute('class', 'task-icon-container avatar');
  taskAvatarContainer.setAttribute('id', `task-avatar-${index}`);
  taskAvatarContainer.dataset.key = index;
  if (!avatar) {
    taskAvatarContainer.style.display = 'none';
  }
  return taskAvatarContainer;
};

const createTaskDeleteContainer = (index) => {
  const taskDeleteContainer = document.createElement('div');
  taskDeleteContainer.setAttribute('class', 'task-icon-container delete');
  taskDeleteContainer.setAttribute('id', `task-delete-${index}`);
  taskDeleteContainer.dataset.key = index;
  taskDeleteContainer.addEventListener('click', function (e) {
    const elementIndex = findElementDataKey(e);
    const element = document.getElementById(`task-element-${elementIndex}`);
    element.remove();
    myTasks.splice(elementIndex, 1);
    localStorage.setItem('myTasks', JSON.stringify(myTasks));
  });
  return taskDeleteContainer;
};

const createTaskEditContainer = (index) => {
  const taskEditContainer = document.createElement('div');
  taskEditContainer.setAttribute('class', 'task-icon-container edit');
  taskEditContainer.setAttribute('id', `task-edit-${index}`);
  taskEditContainer.dataset.key = index;
  taskEditContainer.addEventListener('click', editTask);
  return taskEditContainer;
};

const createTaskAttributesContainer = (index) => {
  const taskAttributesContainer = document.createElement('div');
  taskAttributesContainer.classList.add('task-attributes-container');
  taskAttributesContainer.setAttribute('id', `task-att-${index}`);
  taskAttributesContainer.dataset.key = index;
  return taskAttributesContainer;
};

const editTask = (e) => {
  // const task = myTasks.

  // });

  const key = e.target.dataset.key;
  // const date = ;
  // const priority = document.getElementById(`task-priority-${key}`).nodeValue;
  // const description = ;
  // const label = document.getElementById(`task-label-${key}`).textContent;
  // const category = ; 
  console.log({key, label})

  const formDate = document.getElementById('task-date');
  const formLabel = document.getElementById('add-task-input');
  const formDescription = document.getElementById('add-task-description-input');
  const formCategory = document.getElementById('dropdown-title');


 

  // const taskObject = new Task(
  //   date,
  //   priorityColor,
  //   label,
  //   description,
  //   category,
  //   categoryColor
  // );
}

export { createTask, createTaskWrapper, createTaskContent, populateTasks };
