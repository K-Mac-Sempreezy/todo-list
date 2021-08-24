import { createElement } from './create-element.js';
import { toggleDescriptionPopup } from './update-UI.js';

const createDescriptionPopup = () => {
  const container = createElement('div', {
    id: 'description-popup',
    class: 'popup',
  });

  const topContainer = createElement('div', {
    id: 'description-popup-top-container',
    class: 'top',
  });

  const dateTimeContainer = createElement('div', {
    id: 'description-date-time-container',
    class: 'date-time-container',
  });

  const dateContainer = createElement('div', {
    id: 'descriptin-date-container',
    class: 'levels',
  });

  const dateLabel = createElement('div', {
    id: 'description-date-label',
    class: 'labels',
  });
  
  const date = createElement('div', {
    id: 'description-date',
    class: 'indent',
  });
  
  const timeContainer = createElement('div', {
    id: 'description-time-container',
    class: 'levels',
  });

  const timeLabel = createElement('div', {
    id: 'description-time-label',
    class: 'labels',
  });

  const time = createElement('div', {
    id: 'description-time',
    class: ' indent',
  });

  const taskContainer = createElement('div', {
    id: 'description-task-container',
    class: 'containers',
  });

  const taskLabel = createElement('div', {
    id: 'description-task-label',
    class: 'content-label space labels',
  });

  const task = createElement('div', {
    id: 'description-task',
    class: 'task indent',
  });

  const descriptionContainer = createElement('div', {
    id: 'description-description-container',
    class: 'containers',
  });

  const descriptionLabel = createElement('div', {
    id: 'description-description-label',
    class: 'content-label labels',
  });

  const description = createElement('div', {
    id: 'description-description',
    class: 'task indent',
  });

  const labelsContainer = createElement('div', {
    id: 'description-labels-container',
    class: 'labels-container',
  });

  const priorityContainer = createElement('div', {
    id: 'description-priority-container',
    class: 'levels',
  });

  const priorityLabel = createElement('div', {
    id: 'description-priority-label',
    class: 'labels',
  });

  const priority = createElement('div', {
    id: 'description-priority-content',
    class: 'indent',
  });
  
  const projectContainer = createElement('div', {
    id: 'description-project-container',
    class: 'levels',
  });

  const projectLabel = createElement('div', {
    id: 'description-project-label',
    class: 'labels',
  });

  const project = createElement('div', {
    id: 'description-project-content',
    class: 'indent',
  });

  const categoryContainer = createElement('div', {
    id: 'description-priority-container',
    class: 'levels',
  });

  const categoryLabel = createElement('div', {
    id: 'description-category-label',
    class: 'labels',
  });

  const category = createElement('div', {
    id: 'description-category-content',
    class: 'indent',
  });

  const button = createElement(
    'div',
    {
      id: 'description-close-btn',
      class: 'button',
    },
    {
      click: toggleDescriptionPopup,
    }
  );

  button.textContent = 'Close';
  dateLabel.textContent = 'date:',
  timeLabel.textContent = 'time:',
  date.textContent = 'Aug 16, 2021';
  time.textContent = '9:30 AM';
  priorityLabel.textContent = 'priority:';
  priority.textContent = 'level';
  categoryLabel.textContent = 'category:';
  category.textContent = 'level';
  projectLabel.textContent = 'project:';
  project.textContent = '';
  taskLabel.textContent = 'task:';
  task.textContent = 'Task name here';
  descriptionLabel.textContent = 'description:';
  description.textContent = 'Task description here...';

  dateContainer.appendChild(dateLabel);
  dateContainer.appendChild(date);
  timeContainer.appendChild(timeLabel);
  timeContainer.appendChild(time);
  dateTimeContainer.appendChild(dateContainer);
  dateTimeContainer.appendChild(timeContainer);
  topContainer.appendChild(dateTimeContainer);
  topContainer.appendChild(labelsContainer);

  labelsContainer.appendChild(priorityContainer);
  priorityContainer.appendChild(priorityLabel);
  priorityContainer.appendChild(priority);
  
  labelsContainer.appendChild(categoryContainer);
  categoryContainer.appendChild(categoryLabel);
  categoryContainer.appendChild(category);

  labelsContainer.appendChild(projectContainer);
  projectContainer.appendChild(projectLabel);
  projectContainer.appendChild(project);

  taskContainer.appendChild(taskLabel);

  taskContainer.appendChild(task);
  descriptionContainer.appendChild(descriptionLabel);
  descriptionContainer.appendChild(description);
  container.appendChild(topContainer);
  container.appendChild(taskContainer);
  container.appendChild(descriptionContainer);
  container.appendChild(button);

  return container;
};

export { createDescriptionPopup };
