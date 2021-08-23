import {
  displayForm,
  handleDeleteEditIconsOpacity1,
  handleDeleteEditIconsOpacity0,
  toggleConfirm,
  toggleOverlay,
  toggleDescriptionPopup,
  populateDescriptionPopup,
  fillPriorityCircle,
} from './update-UI.js';
import {
  createElement,
  createElementSVG,
  createElementNS,
} from './create-element.js';
import { editTask } from './edit-task.js';
import { format } from 'date-fns';


const createTaskDateDividerElement = date => {
  const formattedDate = format(new Date(date), 'MM-dd-yyyy');
  const container = createElement('div', {
    class: 'task-date-divider-element',
    id: `task-date-divider-element-${formattedDate}`,
  });

  const dateLabel = createElement('p', {
    class: 'task-date-divider-label',
    id: `task-date-divider-label-${formattedDate}`,
  });

  const taskContainer = createElement('div', {
    id: `task-divider-content-container-${formattedDate}`,
    class: 'task-divider-content-container',
  });

  dateLabel.textContent = format(new Date(date), 'MMM do, yyyy').toString();
  container.appendChild(dateLabel);
  container.appendChild(taskContainer);

  return container;
};

const createTask = (task, index) => {
  let {
    date,
    time,
    label,
    categoryColor,
    categoryLabel,
    priorityColor,
    priorityLabel,
    priorityCircleFill,
    person,
    avatar,
  } = task;

  const taskElement = createElement(
    'div',
    {
      class: 'task-element',
      id: `task-element-${index}`,
      'data-key': index,
    },
    {
      mouseover: handleDeleteEditIconsOpacity1,
      mouseleave: handleDeleteEditIconsOpacity0,
    }
  );

  const taskLabelContainer = createElement(
    'div',
    {
      class: 'task-label-container',
      id: `task-label-container-${index}`,
      'data-key': index,
    },
    {
      click: fillPriorityCircle,
    }
  );

  const timeContainer = createElement('div', {
    id: `task-time-${index}`,
    class: 'time',
    value: time,
    'data-key': index,
  });

  const taskLabel = createElement('p', {
    id: `task-label-${index}`,
    class: 'label',
    'data-key': index,
  });

  const priorityCircle = createElementNS(
    'http://www.w3.org/2000/svg',
    'circle',
    {
      id: `priority-circle-${index}`,
      class: 'priority-circle',
      cx: 12,
      cy: 25,
      r: 10,
      fill: priorityCircleFill,
      stroke: priorityColor,
      'stroke-width': '2px',
      'data-isCircleFilled': false,
      'data-key': index,
    }
  );

  const priorityCircleContainer = createElementSVG(
    'http://www.w3.org/2000/svg',
    'svg',
    {
      class: 'task-priority',
      id: `task-priority-${index}`,
      'data-key': index,
    }
  );

  /**
   * Creates a label
   * @param {string} label for the button
   * @returns the label
   */

  const categoryContainer = createElement('div', {
    class: 'task-category-container',
    id: `task-category-${index}`,
    'data-key': index,
  });

  const taskStatusIcon = createElementSVG('http://www.w3.org/2000/svg', 'svg', {
    class: 'icon status',
    id: `task-status-${index}`,
    'data-key': index,
  });

  const categoryCircle = createElementNS(
    'http://www.w3.org/2000/svg',
    'circle',
    {
      class: 'default-circle',
      cx: 25,
      cy: 25,
      r: 5,
      fill: categoryColor,
      stroke: 'none',
      'data-key': index,
    }
  );

  const taskPersonIcon = createElement('div', {
    class: 'icon person',
    id: `task-person-${index}`,
    'data-key': index,
  });

  const taskAvatarIcon = createElement('div', {
    class: 'icon avatar',
    id: `task-avatar-${index}`,
    'data-key': index,
  });

  const taskDeleteIcon = createElement(
    'div',
    {
      class: 'icon delete',
      id: `task-delete-${index}`,
      'data-key': index,
    },
    {
      click: [toggleConfirm, toggleOverlay],
    }
  );

  const taskEditIcon = createElement(
    'div',
    {
      class: 'icon edit',
      id: `task-edit-${index}`,
      'data-key': index,
    },
    {
      click: [editTask, displayForm],
    }
  );

  const taskDescriptionIcon = createElement(
    'div',
    {
      class: 'icon description',
      id: `task-description-icon-${index}`,
      'data-key': index,
    },
    {
      click: [toggleDescriptionPopup, populateDescriptionPopup],
    }
  );

  const taskAttributesContainer = createElement('div', {
    class: 'task-attributes-container',
    id: `task-att-${index}`,
    'data-key': index,
  });

  timeContainer.textContent = time;
  taskLabel.textContent = label;
  categoryContainer.textContent = categoryLabel;

  priorityCircleContainer.appendChild(priorityCircle);
  taskLabelContainer.appendChild(priorityCircleContainer);
  taskLabelContainer.appendChild(timeContainer);
  taskLabelContainer.appendChild(taskLabel);
  taskStatusIcon.appendChild(categoryCircle);
  taskAttributesContainer.appendChild(taskDescriptionIcon);
  taskAttributesContainer.appendChild(taskEditIcon);
  taskAttributesContainer.appendChild(taskDeleteIcon);
  taskAttributesContainer.appendChild(categoryContainer);
  taskAttributesContainer.appendChild(taskPersonIcon);
  taskAttributesContainer.appendChild(taskStatusIcon);
  taskAttributesContainer.appendChild(taskAvatarIcon);
  taskElement.appendChild(taskLabelContainer);
  taskElement.appendChild(taskAttributesContainer);
  return taskElement;
};

export { createTask, createTaskDateDividerElement };
