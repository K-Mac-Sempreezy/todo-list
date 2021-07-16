import '/src/style.css';
import { createMenu } from './menu.js';

const createHeader = () => {
  const header = document.createElement('header');
  header.setAttribute('id', 'header');

  const logo = document.createElement('h3');
  logo.setAttribute('id', 'header-logo'); 
  logo.textContent = 'todo-it';
  
  header.appendChild(logo);
  
  return header;
}

const createDefaultView = () => {
  //if no tasks created (ie. first time opening app)

  const contentWrapper = document.createElement('div');
  contentWrapper.setAttribute('id', 'content-wrapper');

  const contentHeaderContainer = document.createElement('div');
  contentHeaderContainer.setAttribute('id', 'content-header-container');
  
  const contentLabel = document.createElement('h2');
  contentLabel.textContent = 'Today';

  const iconsContainer = document.createElement('div');
  iconsContainer.setAttribute('id', 'icons-container');

  const personIcon = document.createElement('div');
  personIcon.setAttribute('class', 'icon-content');
  personIcon.setAttribute('id', 'icon-person');
  
  const chatIcon = document.createElement('div');
  chatIcon.setAttribute('class', 'icon-content');
  chatIcon.setAttribute('id', 'icon-chat');
  
  const settingsIcon = document.createElement('div');
  settingsIcon.setAttribute('class', 'icon-content');
  settingsIcon.setAttribute('id', 'icon-settings');
  
  const taskContainer = document.createElement('div');
  taskContainer.setAttribute('class', 'task-container');
  
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
  circle.setAttributeNS(null, 'stroke', 'rgb(121, 121, 121)');
  circle.setAttributeNS(null, 'stroke-width', '2px');
  
  const taskLabel = document.createElement('p');
  taskLabel.textContent = '12:30 Lunch with Sarah';

  const taskAttributesContainer = document.createElement('div');
  taskAttributesContainer.setAttribute('class', 'task-attributes-container')

  const taskCategoryContainer = document.createElement('div');
  taskCategoryContainer.setAttribute('class', 'task-category-container')
  taskCategoryContainer.textContent = 'Personal';
  
  const taskIconContainer = document.createElement('div');
  taskIconContainer.setAttribute('class', 'task-icon-container');
  
  const taskStatusContainer = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  taskStatusContainer.setAttribute('class', 'task-status-container');
  
  const taskAvatarContainer = document.createElement('div');
  taskAvatarContainer.setAttribute('class', 'task-avatar-container');

  taskAttributesContainer.appendChild(taskCategoryContainer)
  taskAttributesContainer.appendChild(taskIconContainer)
  taskAttributesContainer.appendChild(taskStatusContainer)
  taskAttributesContainer.appendChild(taskAvatarContainer)
  circleContainer.appendChild(circle);
  taskLabelContainer.appendChild(circleContainer);
  taskLabelContainer.appendChild(taskLabel);
  taskContainer.appendChild(taskLabelContainer);
  taskContainer.appendChild(taskAttributesContainer)
  iconsContainer.appendChild(personIcon);
  iconsContainer.appendChild(chatIcon);
  iconsContainer.appendChild(settingsIcon);
  contentHeaderContainer.appendChild(contentLabel);
  contentHeaderContainer.appendChild(iconsContainer);
  contentWrapper.appendChild(contentHeaderContainer);
  contentWrapper.appendChild(taskContainer);

  return contentWrapper;
};

const pageLoad = () => {

  document.body.appendChild(createHeader());
  document.body.appendChild(createMenu());
  document.body.appendChild(createDefaultView());

}

export { pageLoad };