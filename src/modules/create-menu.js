import { createElement, createElementSVG, createElementNS } from './create-element';
import { inboxTaskSort, todayTaskFilter, next7TaskFilter } from './edit-task';
import { menuElementsList } from './variables';
// import { toSpinalCase } from './update-UI';
import { handleView } from './update-UI';


const createMenu = () => {
  const menu = createElement('div', {
    id: 'menu',
  });

  const menuItems = createElement('div', {
    id: 'menu-elements-wrapper',
  });

  const menuDividerLine1 = createElement('div', {
    class: 'menu-divide-line',
    id: ``,
  });

  const menuDividerLine2 = createElement('div', {
    class: 'menu-divide-line',
    id: ``,
  });

  const projectContainer = createElement('div', {
    class: '',
    id: 'menu-project-container',
  });

  menuItems.appendChild(createElementMenu(menuElementsList[0]));
  menuItems.appendChild(menuDividerLine1);
  menuItems.appendChild(createElementMenu(menuElementsList[1]));
  menuItems.appendChild(createElementMenu(menuElementsList[2]));
  menuItems.appendChild(createElementMenu(menuElementsList[3]));
  menuItems.appendChild(menuDividerLine2); //adding second divider here
  menuItems.appendChild(projectContainer); 
  menuItems.appendChild(createElementMenu(menuElementsList[4]));
  menu.appendChild(menuItems);

  return menu;
};

const createElementMenu = (menuItem, index) => {
  let { title, svg, count, elementLabel, eventListenerObject } = menuItem;

  const container = createElement('div', {
    class: 'menu-element-container',
    id: `menu-${title}-element-container`,
    'data-key': index,
  });
  
  const icon = createElementSVG('http://www.w3.org/2000/svg', 'svg', {
    class: 'menu-element-icon',
    id: `${title}-icon`,
    'data-key': index,
  });
  
  const label = createElement('p', {
    class: 'menu-element-label',
    id: `menu-${title}-label`,
    'data-key': index,
  });
  
  const countNumber = createElement('p', {
    class: 'count',
    id: `menu-${title}-count`,
    'data-key': index,
  });

  icon.innerHTML = svg;
  label.textContent = elementLabel;

  if (title === 'inbox') {
    countNumber.textContent = inboxTaskSort().length;
  } else if (title === 'today') {
    countNumber.textContent = todayTaskFilter().length;
  } else if (title === 'next-seven') {
    countNumber.textContent = next7TaskFilter().length;
  }

  Object.entries(eventListenerObject).forEach(([key, value]) => {
    value.forEach(val => container.addEventListener(key, val));
  });

  container.appendChild(icon);
  container.appendChild(label);
  if (count === true) {
    container.appendChild(countNumber);
  }

  return container;
};

const createElementMenuAddProject = (project, index) => {
  let {
    name,
    dueDate,
    time,
    description,
    categoryColor,
    priorityColor,
    categoryLabel,
    priorityLabel,
    priorityCircleFill,
  } = project;

  const container = createElement('div', {
    class: 'menu-element-container',
    id: `project-menu-element-container-${index}`,
    'data-key': index,
  });

  const icon = createElementNS('http://www.w3.org/2000/svg', 'circle', {
    id: `project-icon-${index}`,
    class: 'priority-circle',
    cx: 12,
    cy: 25,
    r: 10,
    fill: priorityCircleFill,
    stroke: priorityColor,
    'stroke-width': '2px',
    'data-isCircleFilled': false,
    'data-key': index,
  });

  const iconContainer = createElementSVG('http://www.w3.org/2000/svg', 'svg', {
    class: 'task-priority',
    id: `project-icon-container-${index}`,
    'data-key': index,
  });
  
  
  const label = createElement('p', {
    class: 'menu-element-label',
    id: `project-label-${index}`,
    'data-key': index,
  });
  
  const countNumber = createElement('p', {
    class: 'count',
    id: `project-count-${index}`,
    'data-key': index,
  });

  label.textContent = name;
  container.addEventListener('click', handleView);

  container.appendChild(iconContainer);
  iconContainer.appendChild(icon);
  container.appendChild(label);
  container.appendChild(countNumber);

  return container;
};

export { createMenu, createElementMenuAddProject };
