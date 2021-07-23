const createAddTaskMenu = () => {
  const addTaskContainer = document.createElement('div');
  addTaskContainer.setAttribute('id', 'add-task-container');

  const addIconContainer = document.createElement('div');
  addIconContainer.setAttribute('id', 'add-task-icon-container');

  const addTaskIcon = document.createElement('p');
  addTaskIcon.setAttribute('id', 'add-task-icon');
  addTaskIcon.textContent = '+';

  const addTaskLabel = document.createElement('p');
  addTaskLabel.textContent = 'Add Task';
  addTaskLabel.setAttribute('id', 'add-task-label');

  addIconContainer.appendChild(addTaskIcon);
  addTaskContainer.appendChild(addIconContainer);
  addTaskContainer.appendChild(addTaskLabel);

  return addTaskContainer;
};

export { createAddTaskMenu };