const createAddTaskForm = () => {
  const taskFormContainer = createAddTaskFormContainer();
  const formElement = createFormElement();
  const taskNameLabel = createTaskNameLabel();
  const taskNameInput = createTaskNameInput();
  const categoryUL = createCategoryUL();
  const categoryElements = createCategoryElements();

  formElement.appendChild(taskNameLabel);
  formElement.appendChild(taskNameInput);
  formElement.appendChild(categoryUL);
  formElement.appendChild(taskNameInput);
  formElement.appendChild(categoryElements);
  taskFormContainer.appendChild(formElement);

  return taskFormContainer;
};

const createAddTaskFormContainer = () => {
  const addTaskFormContainer = document.createElement('div');
  addTaskFormContainer.setAttribute('id', 'add-task-form-container');
  return addTaskFormContainer;
};

const createFormElement = () => {
  const formElement = document.createElement('form');
  formElement.setAttribute('id', 'add-task-form');

  return formElement;
};

const createTaskNameLabel = () => {
  const taskNameLabel = document.createElement('label');
  taskNameLabel.setAttribute('id', 'task-name-label');
  taskNameLabel.textContent = 'Task Name';
  return taskNameLabel;
};

const createTaskNameInput = () => {
  const taskNameInput = document.createElement('input');
  taskNameInput.setAttribute('id', 'task-input');
  return taskNameInput;
};

const createCategoryUL = () => {
  const categoryUL = document.createElement('ul');
  categoryUL.setAttribute('id', 'category-ul');
  return categoryUL;
};

const createCategoryElements = () => {
  // const ul = document.getElementById('category-ul');
  const fragment = new DocumentFragment();
  const categories = ['personal', 'work'];

  categories.forEach((category) => {
    let li = document.createElement('li');
    li.textContent = category;
    fragment.appendChild(li);
  });

  // ul.appendChild(fragment);
  return fragment;
};

export { createAddTaskForm };
