import { handleTaskContainerDisplay } from './create-add-task-form';
import { createElement } from './initial-load';

const createAddTaskMenu = () => {
  const addTaskContainer = createElement('div', {
    id: 'add-task-container',
  });

  const addIconContainer = createElement('div', {
    id: 'add-task-icon-container',
  });

  const addTaskIcon = createElement('p', {
    id: 'add-task-icon',
  });

  const addTaskLabel = document.createElement('p', {
    id: 'add-task-label',
  });

  addIconContainer.appendChild(addTaskIcon);
  addTaskContainer.appendChild(addIconContainer);
  addTaskContainer.appendChild(addTaskLabel);

  addTaskIcon.textContent = '+';
  addTaskLabel.textContent = 'Add Task';
  
  addTaskContainer.addEventListener('click', handleTaskContainerDisplay);

  return addTaskContainer;
};

export { createAddTaskMenu };
