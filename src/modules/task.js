import { createTodayHeader } from './today.js';
import { myTasks } from './initial-load';
import { createAddTaskForm } from './add-task-form.js';

const createTaskContent = () => {
  const contentWrapper = document.getElementById('content-wrapper');
  const taskWrapper = document.getElementById('task-wrapper');

  if (contentWrapper.firstElementChild) {
    while (contentWrapper.firstElementChild) {
      contentWrapper.firstElementChild.remove();
    }
  }

  if (taskWrapper.firstElementChild) {
    while (taskWrapper.firstElementChild) {
      taskWrapper.firstElementChild.remove();
    }
  }

  myTasks.forEach((task) => {
    taskWrapper.appendChild(createTask(task));
  });

  contentWrapper.appendChild(createTodayHeader());
  contentWrapper.appendChild(createAddTaskForm());
  contentWrapper.appendChild(taskWrapper);
  createTaskFactory();
};

const createTaskWrapper = () => {
  const taskWrapper = document.createElement('div');
  taskWrapper.setAttribute('id', 'task-wrapper');
  return taskWrapper;
};

// const createTaskHoverElement = () => {
//   const taskHoverElement = document.createElement('div');
//   taskHoverElement.setAttribute('class', 'task-hover-element');
//   return taskHoverElement;
// };

const createTaskElement = () => {
  const taskElement = document.createElement('div');
  taskElement.setAttribute('class', 'task-element');
  return taskElement;
};

const createTask = (object) => {
  let { priority, label, category, categoryColor, person, avatar } = object;
  // let coord = [0,0];
  // let [x,y]= coord;
  const taskElement = createTaskElement();
  // const taskHoverElement = createTaskHoverElement();
  const taskLabelContainer = createTaskLabelContainer(priority, label);
  const taskAttributes = createTaskAttributes(
    category,
    categoryColor,
    person,
    avatar
  );

  taskElement.appendChild(taskLabelContainer);
  taskElement.appendChild(taskAttributes);

  return taskElement;
  // document.getElementById('task-wrapper').appendChild(taskElement);
  // document.getElementById('task-wrapper').appendChild(taskHoverElement);
};

const createTaskLabelContainer = (priority, label) => {
  const taskLabelContainer = document.createElement('div');
  taskLabelContainer.classList.add('task-label-container');

  const priorityCircle = createPriority(priority);
  const taskLabel = createLabel(label);

  taskLabelContainer.appendChild(priorityCircle);
  taskLabelContainer.appendChild(taskLabel);
  return taskLabelContainer;
};

/**
 * Creates a label
 * @param {string} label for the button
 * @returns the label
 */
const createLabel = (label) => {
  const taskLabel = document.createElement('p');
  taskLabel.textContent = label;
  return taskLabel;
};

const createPriority = (priority) => {
  const circle = createCircle(priority);
  const circleContainer = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  circleContainer.classList.add('task-priority');
  circleContainer.appendChild(circle);

  return circleContainer;
};

const createCircle = (priority) => {
  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  circle.setAttributeNS(null, 'class', 'priority-circle');
  circle.setAttributeNS(null, 'cx', 12);
  circle.setAttributeNS(null, 'cy', 25);
  circle.setAttributeNS(null, 'r', 10);
  circle.setAttributeNS(null, 'fill', 'none');
  circle.setAttributeNS(null, 'stroke', priority);
  circle.setAttributeNS(null, 'stroke-width', '2px');
  return circle;
};

const createTaskCategoryContainer = (category) => {
  const categoryContainer = document.createElement('div');
  categoryContainer.classList.add('task-category-container');
  categoryContainer.textContent = category;

  return categoryContainer;
};

const createStatusContainer = () => {
  const taskStatusContainer = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  taskStatusContainer.classList.add('task-status-container');
  return taskStatusContainer;
};

const createStatus = (categoryColor) => {
  const status = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  status.setAttributeNS(null, 'class', 'default-circle');
  status.setAttributeNS(null, 'cx', 15);
  status.setAttributeNS(null, 'cy', 25);
  status.setAttributeNS(null, 'r', 5);
  status.setAttributeNS(null, 'fill', categoryColor);
  status.setAttributeNS(null, 'stroke', 'none');
  return status;
};

const createPersonContainer = (person) => {
  const taskPersonContainer = document.createElement('div');
  taskPersonContainer.classList.add('task-person-container'); //doesn't contain person element yet
  if (!person) {
    taskPersonContainer.style.display = 'none';
  }
  return taskPersonContainer;
};

const createTaskAvatarContainer = (avatar) => {
  const taskAvatarContainer = document.createElement('div');
  taskAvatarContainer.classList.add('task-avatar-container');
  if (!avatar) {
    taskAvatarContainer.style.display = 'none';
  }
  return taskAvatarContainer;
};

const createTaskAttributes = (category, categoryColor, person, avatar) => {
  const taskCategoryContainer = createTaskCategoryContainer(category);
  const taskStatusContainer = createStatusContainer();
  const status = createStatus(categoryColor);
  const taskPersonContainer = createPersonContainer(person);
  const taskAvatarContainer = createTaskAvatarContainer(avatar);

  const taskAttributesContainer = document.createElement('div');
  taskAttributesContainer.classList.add('task-attributes-container');

  taskStatusContainer.appendChild(status);
  taskAttributesContainer.appendChild(taskCategoryContainer);
  taskAttributesContainer.appendChild(taskPersonContainer);
  taskAttributesContainer.appendChild(taskStatusContainer);
  taskAttributesContainer.appendChild(taskAvatarContainer);

  return taskAttributesContainer;
};

export { createTask, createTaskWrapper, createTaskContent };
