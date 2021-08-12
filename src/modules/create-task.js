import {
  handleDeleteEditIconsOpacity1,
  handleDeleteEditIconsOpacity0,
  deleteTask,
} from './update-UI.js';
import {
  createElement,
  createElementSVG,
  createElementNS,
} from './create-element.js';
import {
  editTask
} from './edit-task.js';
import { format } from 'date-fns';

//create element functions

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
  })

  dateLabel.textContent = format(new Date(date), 'MMM do, yyyy').toString();
  container.appendChild(dateLabel);
  container.appendChild(taskContainer);


  return container;
};

const createTask = (task, index) => {
  let { date, label, categoryColor, categoryLabel, priorityColor, priorityLabel, person, avatar } = task;

  // categoryLabel = categoryLabel.toLowerCase().trim();

  const taskElement = createElement('div', {
    class: 'task-element',
    id: `task-element-${index}`,
    'data-key': index,
  });

  const taskLabelContainer = createElement('div', {
    class: 'task-label-container',
    id: `task-label-container-${index}`,
  });

  const taskLabel = createElement('p', {
    id: `task-label-${index}`,
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
      fill: 'none',
      stroke: priorityColor,
      'stroke-width': '2px',
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

  const taskStatusContainer = createElementSVG(
    'http://www.w3.org/2000/svg',
    'svg',
    {
      class: 'task-icon-container status',
      id: `task-status-${index}`,
      'data-key': index,
    }
  );

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

  const taskPersonContainer = createElement('div', {
    class: 'task-icon-person person',
    id: `task-person-${index}`,
    'data-key': index,
  });

  const taskAvatarContainer = createElement('div', {
    class: 'task-icon-container avatar',
    id: `task-avatar-${index}`,
    'data-key': index,
  });

  const taskDeleteContainer = createElement('div', {
    class: 'task-icon-container delete',
    id: `task-delete-${index}`,
    'data-key': index,
  });

  const taskEditContainer = createElement('div', {
    class: 'task-icon-container edit',
    id: `task-edit-${index}`,
    'data-key': index,
  });

  const taskAttributesContainer = createElement('div', {
    class: 'task-attributes-container',
    id: `task-att-${index}`,
    'data-key': index,
  });

  taskLabel.textContent = label;
  categoryContainer.textContent = categoryLabel;
  // .toLowerCase().trim();

  taskElement.addEventListener('mouseover', handleDeleteEditIconsOpacity1);
  taskElement.addEventListener('mouseleave', handleDeleteEditIconsOpacity0);
  taskEditContainer.addEventListener('click', editTask);
  taskDeleteContainer.addEventListener('click', deleteTask);

  priorityCircleContainer.appendChild(priorityCircle);
  taskLabelContainer.appendChild(priorityCircleContainer);
  taskLabelContainer.appendChild(taskLabel);
  taskStatusContainer.appendChild(categoryCircle);
  taskAttributesContainer.appendChild(taskEditContainer);
  taskAttributesContainer.appendChild(taskDeleteContainer);
  taskAttributesContainer.appendChild(categoryContainer);
  taskAttributesContainer.appendChild(taskPersonContainer);
  taskAttributesContainer.appendChild(taskStatusContainer);
  taskAttributesContainer.appendChild(taskAvatarContainer);
  taskElement.appendChild(taskLabelContainer);
  taskElement.appendChild(taskAttributesContainer);
  return taskElement;
};

export { createTask, createTaskDateDividerElement };
