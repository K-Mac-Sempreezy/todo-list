import {
  createElement,
  createElementSVG,
  createElementNS,
} from './create-element';
import { inboxTaskSort, todayTaskFilter, next7TaskFilter } from './edit-task.js';
import { editProject, projectTaskFilter } from './edit-project';
import { currentPageView, menuElementsList } from './variables';
import {
  handleView,
  displayForm,
  toggleConfirm, 
  toggleOverlay,
  handleDeleteEditIconsOpacity1,
  handleDeleteEditIconsOpacity0,
  toggleDescriptionPopup,
  populateDescriptionPopup,
} from './update-UI';
import { svgEdit, svgTrash, svgDescription } from './svg-variables';

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
  menuItems.appendChild(createProjectSubHeaderLabel());
  menuItems.appendChild(projectContainer);
  menuItems.appendChild(createElementMenu(menuElementsList[4]));
  menu.appendChild(menuItems);

  return menu;
};

const createProjectSubHeaderLabel = () => {
  const container = createElement('div', {
    class: 'menu-project-subhead-container display-none',
    id: 'menu-project-subheader',
  });

  const projectLabel = createElement('div', {
    class: 'menu-element-label',
    id: 'menu-subheader-project-label',
  });

  const countNumber = createElement('p', {
    class: 'count',
    id: 'menu-project-subheader-count',
  });

  projectLabel.textContent = 'Projects';
  container.appendChild(projectLabel);
  container.appendChild(countNumber);
  return container;
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

const createElementMenuProject = (project, index) => {
  let {
    name,
    date,
    time,
    description,
    categoryColor,
    priorityColor,
    categoryLabel,
    priorityLabel,
    priorityCircleFill,
  } = project;

  const container = createElement(
    'div',
    {
      class: 'menu-project-element-container',
      id: `project-menu-element-container-${index}`,
      'data-key': index,
    },
    {
      mouseover: handleDeleteEditIconsOpacity1,
      mouseleave: handleDeleteEditIconsOpacity0,
      click: handleView,
    }
  );

  const identityContainer = createElement('div', {
    id: `project-identity-container-${index}`,
    class: 'identity-container',
  });

  const projectIcon = createElementNS('http://www.w3.org/2000/svg', 'circle', {
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

  const projectIconContainer = createElementSVG('http://www.w3.org/2000/svg', 'svg', {
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

  const iconsContainer = createElement('div', {
    id: `menu-project-icons-container-${index}`,
    class: 'icons-container',
  })

  const deleteContainer = createElement(
    'div',
    {
      id: `menu-project-delete-container-${index}`,
      class: 'pointer-events project-icon-container',
      'data-key': index,
    },
    {
      // click: deleteProject,
      click: [toggleConfirm, toggleOverlay],
    }
  );

  const deleteIcon = createElementSVG(
    'http://www.w3.org/2000/svg',
    'svg',
    {
      class: 'menu-project-icon trash',
      id: `project-delete-${index}`,
      'data-key': index,
    },
    {
    }
  );

  const editContainer = createElement('div', {
    id: `menu-project-edit-container-${index}`,
    class: 'pointer-events project-icon-container',
    'data-key': index,
  },
    {
      click: [displayForm, editProject],
    }
  );

  const editIcon = createElementSVG(
    'http://www.w3.org/2000/svg',
    'svg',
    {
      class: 'menu-project-icon pencil',
      id: `project-edit-${index}`,
      'data-key': index,
    });

  const descriptionContainer = createElement('div', {
    id: `menu-project-description-container-${index}`,
    class: 'pointer-events project-icon-container',
    'data-key': index,
  },
  {
    click: [toggleDescriptionPopup, populateDescriptionPopup],
  });

  const descriptionIcon = createElementSVG(
    'http://www.w3.org/2000/svg',
    'svg',
    {
      class: 'menu-project-icon glasses',
      id: `project-description-icon-${index}`,
      'data-key': index,
    },
    {
      // click: [toggleDescriptionPopup, populateDescriptionPopup],
    }
  );

  countNumber.textContent = projectTaskFilter(name).length;
  deleteIcon.innerHTML = svgTrash;
  editIcon.innerHTML = svgEdit;
  descriptionIcon.innerHTML = svgDescription;
  label.textContent = name;
  if (name === currentPageView.pageLabel) {
    label.style.fontWeight = '700';
  }

  projectIconContainer.appendChild(projectIcon);
  identityContainer.appendChild(projectIconContainer)
  identityContainer.appendChild(label)
  identityContainer.appendChild(countNumber);
  container.appendChild(identityContainer);
  descriptionContainer.appendChild(descriptionIcon);
  editContainer.appendChild(editIcon);
  deleteContainer.appendChild(deleteIcon);
  iconsContainer.appendChild(descriptionContainer);
  iconsContainer.appendChild(editContainer);
  iconsContainer.appendChild(deleteContainer);
  container.appendChild(iconsContainer);

  return container;
};

export { createMenu, createElementMenuProject, createProjectSubHeaderLabel };
