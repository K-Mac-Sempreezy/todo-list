import { updateContentLabel } from './update-UI.js';
import { myTasks } from './initial-load';
import {
  handleDeleteEditIconsOpacity1,
  handleDeleteEditIconsOpacity0,
  deleteTask,
} from './update-UI.js';
import format from 'date-fns/format';
import { editTask } from './edit-task.js';
import {
  createElement,
  createElementSVG,
  createElementNS,
} from './create-element.js';

//create element functions
const createTaskContent = e => {
  const contentWrapper = document.getElementById('content-wrapper');
  const taskWrapper = document.getElementById('task-wrapper');
  localStorage.setItem('myTasks', JSON.stringify(myTasks));

  clearTaskWrapper();

  if (e.target.id === 'inbox-container') {
    const tasks = myTasks;
    appendTasks(tasks);
    updateContentLabel('Inbox');
  } else if (e.target.id === 'today-container') {
    const tasks = todayTaskFilter();
    appendTasks(tasks);
    updateContentLabel('Today');
  } else if (e.target.id === 'next-seven-container') {
    const tasks = next7Filter();
    appendTasks(tasks);
    updateContentLabel('Next 7 Days');
  }
  contentWrapper.appendChild(taskWrapper);
};

const createTask = (task, index) => {
  let { date, priority, priorityColor, label, category, person, avatar } = task;

  category = category.toLowerCase().trim();
  let categoryColor = '';
  if (category === 'personal') {
    categoryColor = '#1e90ff'; //blue
  } else if (category === 'work') {
    categoryColor = '#ffdb58'; //yellow
  } else if (category === 'learning') {
    categoryColor = '#32cd32'; //green
  } else if (category === 'hobby') {
    categoryColor = '#ff9f00'; //orange
  }

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

  taskElement.dataset.key = index;
  taskLabel.textContent = label;
  categoryContainer.textContent = category.toLowerCase().trim();

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

export { createTask, createTaskContent };
