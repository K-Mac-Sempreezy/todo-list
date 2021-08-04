import datepicker from 'js-datepicker';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { populateTasks } from './task';

let options = ['Personal', 'Work', 'Hobby', 'Learning'];

const createAddTaskForm = () => {
  const addTaskFormContainer = createAddTaskFormContainer();
  const formElement = createFormElement();
  const topLineContainer = createTopLineContainer();
  const taskNameInput = createTaskNameInput();
  const inputContainer = createInputContainer();
  const dateInput = createDateInput();
  const descriptionContainer = createDescrptionContainer();
  const dateInputContainer = createDateInputContainer();
  const descriptionInput = createDescriptionInput();
  const dropdownContainer = createDropdownContainer();
  const dropdownTitle = createDropdownTitle();
  const dropdownIcon = createDropdownIcon();
  const optionContainer = createOptionContainer();
  const buttonContainer = createButtonContainer();
  const cancelButton = createCancelButton();
  const submitButton = createSubmitButton();

  topLineContainer.appendChild(taskNameInput);
  topLineContainer.appendChild(inputContainer);
  dateInputContainer.appendChild(dateInput);
  inputContainer.appendChild(dateInputContainer);
  formElement.appendChild(topLineContainer);
  descriptionContainer.appendChild(descriptionInput);
  formElement.appendChild(descriptionContainer);
  formElement.appendChild(dropdownContainer);
  dropdownContainer.appendChild(dropdownTitle);
  dropdownTitle.appendChild(dropdownIcon);
  dropdownContainer.appendChild(optionContainer);
  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(submitButton);
  addTaskFormContainer.appendChild(formElement);
  addTaskFormContainer.appendChild(buttonContainer);
  return addTaskFormContainer;
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

const createTopLineContainer = () => {
  const topLineContainer = document.createElement('form');
  topLineContainer.setAttribute('id', 'add-task-top-line-container');
  return topLineContainer;
};

const createTaskNameInput = () => {
  const taskNameInput = document.createElement('textarea');
  taskNameInput.setAttribute('class', 'textarea');
  taskNameInput.setAttribute('id', 'add-task-input');
  taskNameInput.setAttribute('type', 'text');
  taskNameInput.setAttribute('placeholder', 'Add task name');
  return taskNameInput;
};

const createInputContainer = () => {
  const inputContainer = document.createElement('div');
  inputContainer.setAttribute('id', 'date-input-container');
  return inputContainer;
};

const createDateInputContainer = () => {
  const dateInputContainer = document.createElement('div');
  dateInputContainer.setAttribute('id', 'date-input-container');
  return dateInputContainer;
};

const createDateInput = () => {
  const dateInput = document.createElement('input');
  dateInput.setAttribute('id', 'task-date');
  dateInput.setAttribute('type', 'text');
  dateInput.setAttribute('placeholder', 'Choose date');
  dateInput.addEventListener('click', dateSelect);
  return dateInput;
};  

const createDescrptionContainer = () => {
  const descriptionContainer = document.createElement('div');
  descriptionContainer.setAttribute('id', 'add-task-description-container');
  return descriptionContainer;
};

const createDescriptionInput = () => {
  const descriptionInput = document.createElement('textarea');
  descriptionInput.setAttribute('id', 'add-task-description-input');
  descriptionInput.setAttribute('class', 'textarea');
  descriptionInput.setAttribute('placeholder', 'Add description');
  return descriptionInput;
};

const createDropdownContainer = () => {
  const container = document.createElement('div');
  container.setAttribute('id', 'add-task-dropdown-container');
  container.setAttribute('class', 'dropdown');
  return container;
};

const createDropdownTitle = () => {
  const title = document.createElement('div');
  title.setAttribute('id', 'dropdown-title');
  title.setAttribute('class', 'title pointer-cursor');
  title.textContent = 'Category';
  title.addEventListener('click', toggleMenuDisplay);
  return title;
};

const createDropdownIcon = () => {
  const icon = document.createElement('i');
  icon.setAttribute('id', 'dropdown-icon');
  icon.setAttribute('class', 'fa fa-angle-right');
  return icon;
};

const createOptionContainer = () => {
  const optionContainer = document.createElement('div');
  optionContainer.setAttribute('id', 'option-container');
  optionContainer.setAttribute('class', 'menu pointer-cursor hide');

  options.forEach((option, index) => {
    const op = document.createElement('div');
    op.setAttribute('class', 'option');
    op.setAttribute('id', `option-${index}`);
    op.textContent = option;
    op.addEventListener('click', handleOptionSelected);
    optionContainer.appendChild(op);
  });

  return optionContainer;
};

const createButtonContainer = () => {
  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('id', 'add-task-form-button-container');
  return buttonContainer;
};

const createCancelButton = () => {
  const cancelButton = document.createElement('button');
  cancelButton.setAttribute('class', 'button');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', addTaskFormCancelHandler)
  return cancelButton;
};

const createSubmitButton = () => {
  const submitButton = document.createElement('button');
  submitButton.setAttribute('class', 'button');
  submitButton.textContent = 'Submit';
  submitButton.addEventListener('click', populateTasks);
  return submitButton;
};

const toggleClass = (elem, className) => {
  if (elem.classList.contains(className)) {
    const classNames = elem.getAttribute('class');
    const newClasses = classNames.replace(className, '');
    elem.setAttribute('class', newClasses);
  } else {
    const classNames = elem.getAttribute('class');
    const newClassNames = classNames + ' ' + className;
    elem.setAttribute('class', newClassNames);
  }
  return elem;
};

const toggleMenuDisplay = () => {
  const menu = document.getElementById('option-container');
  const icon = document.getElementById('dropdown-icon');
  
  toggleClass(menu, 'hide');
  toggleClass(icon, 'rotate-90');
};

const addTaskFormCancelHandler = () => {
  document.getElementById('add-task-form-container').style.display = 'none';
  document.getElementById('add-task-input').value = '';
  document.getElementById('task-date').value = '';
  document.getElementById('add-task-description-input').value = '';
  document.getElementById('dropdown-title').textContent = 'Category';
}

const handleOptionSelected = (e) => {
  toggleClass(e.target.parentNode, 'hide');

  const id = e.target.id;
  const newValue = e.target.textContent + ' ';
  const titleElem = document.getElementById('dropdown-title');
  const icon = document.getElementById('dropdown-icon');

  titleElem.textContent = newValue;
  titleElem.appendChild(icon);
};

const handleTaskContainerDisplay = () => {
  const container = document.getElementById('add-task-form-container');
  container.style.display = 'flex';
}

const dateSelect = (e) => {
  const picker = datepicker('#task-date');
  e.stopPropagation();
  const isHidden = picker.calendarContainer.classList.contains('qs-hidden');
  picker[isHidden ? 'show' : 'hide']();
}

library.add(faAngleRight);
dom.watch();

export { createAddTaskForm, addTaskFormCancelHandler, handleTaskContainerDisplay };
