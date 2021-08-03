const createAddTaskMenu = () => {
  const container = createAddTaskMenuContainer();
  const iconContainer = createAddIconContainer();
  const addTaskIcon = createAddTaskIcon();
  const addTaskLabel = createAddTaskLabel();

  iconContainer.appendChild(addTaskIcon);
  container.appendChild(iconContainer);
  container.appendChild(addTaskLabel);
  return container;
};

const createAddTaskMenuContainer = () => {
  const addTaskContainer = document.createElement('div');
  addTaskContainer.setAttribute('id', 'add-task-container');
  addTaskContainer.addEventListener('click', () => {
    if (document.getElementById('add-task-form-container').style.display = 'flex'){
      return;
    } else {
      document.getElementById('add-task-form-container').style.display = 'flex';
    };
  });
  return addTaskContainer;
};

const createAddIconContainer = () => {
  const addIconContainer = document.createElement('div');
  addIconContainer.setAttribute('id', 'add-task-icon-container');
  return addIconContainer;
};

const createAddTaskIcon = () => {
  const addTaskIcon = document.createElement('p');
  addTaskIcon.setAttribute('id', 'add-task-icon');
  addTaskIcon.textContent = '+';
  return addTaskIcon;
};

const createAddTaskLabel = () => {
  const addTaskLabel = document.createElement('p');
  addTaskLabel.textContent = 'Add Task';
  addTaskLabel.setAttribute('id', 'add-task-label');
  return addTaskLabel;
};

export { createAddTaskMenu };
