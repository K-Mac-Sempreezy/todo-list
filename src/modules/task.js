import { createTodayHeader } from './today.js';

let myTasks = JSON.parse(localStorage.getItem('myTasks') || '[]');

const createTaskContent = () => {

  const contentWrapper = document.getElementById('content-wrapper');
  const taskWrapper = document.getElementById('task-wrapper');

  while(contentWrapper.firstElementChild) {
    contentWrapper.firstElementChild.remove();
  };

  taskWrapper.appendChild(createTask());
  contentWrapper.appendChild(createTodayHeader());
  contentWrapper.appendChild(taskWrapper);
  
  return contentWrapper;
};

const createTaskWrapper = () => {
  const taskWrapper = document.createElement('div');
  taskWrapper.setAttribute('id', 'task-wrapper');

  return taskWrapper;
};

const createTask = (priority, label, category, categoryColor, person, avatar) => {

  if (!document.getElementById('task-wrapper')) {
    const taskWrapper = createTaskWrapper();
  } else {
    const taskWrapper = document.getElementById('task-wrapper');
  }
  // console.log(taskWrapper);
  const taskContainer = document.createElement('div');
  taskContainer.setAttribute('class', 'task-container');

  taskContainer.appendChild(createTaskLabel(priority, label));
  taskContainer.appendChild(createTaskAttributes(category, categoryColor, person, avatar));

  return taskContainer;
};

const createTaskLabel = (priority, label) => {

  const taskLabelContainer = document.createElement('div');
  taskLabelContainer.setAttribute('class', 'task-label-container');

  const circleContainer = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  circleContainer.setAttribute('id', 'circle-container');
  circleContainer.setAttribute('class', 'task-circle');

  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  circle.setAttributeNS(null, 'id', 'default-circle');
  circle.setAttributeNS(null, 'cx', 12);
  circle.setAttributeNS(null, 'cy', 25);
  circle.setAttributeNS(null, 'r', 10);
  circle.setAttributeNS(null, 'fill', 'none');
  circle.setAttributeNS(null, 'stroke', priority);
  circle.setAttributeNS(null, 'stroke-width', '2px');

  const taskLabel = document.createElement('p');
  taskLabel.textContent = label;  
  
  circleContainer.appendChild(circle);
  taskLabelContainer.appendChild(circleContainer);
  taskLabelContainer.appendChild(taskLabel);

  return taskLabelContainer;
}
 
const createTaskAttributes = (category, categoryColor, person, avatar) => {

  const taskAttributesContainer = document.createElement('div');
  taskAttributesContainer.setAttribute('class', 'task-attributes-container')

  const taskCategoryContainer = document.createElement('div');
  taskCategoryContainer.setAttribute('id', 'task-category-container')
  taskCategoryContainer.setAttribute('class', 'task-item-container')
  taskCategoryContainer.textContent = category;

  const taskPersonContainer = document.createElement('div');
  taskPersonContainer.setAttribute('id', 'task-icon-container')
  taskPersonContainer.setAttribute('class', 'task-item-container');

  const taskStatusContainer = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
    );
  taskStatusContainer.setAttribute('class', 'task-item-container');
  taskStatusContainer.setAttribute('id', 'task-status-container')
    
  const status = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
    );
  status.setAttributeNS(null, 'id', 'default-circle');
  status.setAttributeNS(null, 'cx', 15);
  status.setAttributeNS(null, 'cy', 25);
  status.setAttributeNS(null, 'r', 5);
  status.setAttributeNS(null, 'fill', categoryColor);
  status.setAttributeNS(null, 'stroke', 'none');

  

  const taskAvatarContainer = document.createElement('div');
  taskAvatarContainer.setAttribute('id', 'task-avatar-container');
  taskAvatarContainer.setAttribute('class', 'task-item-container');
  if (!avatar) {
    taskAvatarContainer.style.display = 'none'; 
  }
 

  taskStatusContainer.appendChild(status);
  taskAttributesContainer.appendChild(taskCategoryContainer)
  taskAttributesContainer.appendChild(taskPersonContainer)
  taskAttributesContainer.appendChild(taskStatusContainer)
  taskAttributesContainer.appendChild(taskAvatarContainer)

  return taskAttributesContainer;

};


export { createTask, createTaskWrapper, createTaskContent };