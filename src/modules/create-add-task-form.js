import datepicker from 'js-datepicker';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { updateTasks } from './update-UI.js';
import { createElement } from './initial-load.js';


const createAddTaskForm = () => {
  
  const addTaskFormContainer = createElement('div', {
    id: 'add-task-form-container',
  });
  
  const formElement = createElement('form', {
    id: 'add-task-form',
  });
  
  const topLineContainer = createElement('form', {
    id: 'add-task-top-line-container',
  });
  
  const taskNameInput = createElement('textarea', {
    id: 'add-task-input',
    class: 'textarea',
    type: 'text',
    placeholder: 'Add task name',
  });
  
  const inputContainer = createElement('div', {
    id: 'date-input-container',
  });
  
  const dateInputContainer = createElement('div', {
    id: 'date-input-container',
  });
  
  const dateInput = createElement('input', {
    id: 'task-date',
    type: 'text',
    placeholder: 'Choose date',
  });
  
  const descriptionContainer = createElement('div', {
    id: 'add-task-description-container',
  });
  
  const descriptionInput = createElement('input', {
    id: 'add-task-description-input',
    class: 'textarea',
    placeholder: 'Add description',
  });
  
  const dropdownContainer = createElement('input', {
    id: 'add-task-dropdown-container',
    class: 'dropdown',
  });
  
  const dropdownTitle = createElement('div', {
    id: 'dropdown-title',
    class: 'title pointer-cursor',
  });
  
  const dropdownIcon = createElement('i', {
    id: 'dropdown-icon',
    class: 'fa fa-angle-right',
  });
  
  const optionContainer = createElement('div', {
    id: 'option-container',
    class: 'menu pointer-cursor hide',
  });
  
  const buttonContainer = createElement('div', {
    id: 'add-task-form-button-container',
  });
  
  const cancelButton = createElement('button', {
    class: 'button',
  });
  
  const submitButton = createElement('button', {
    class: 'button',
  });
  
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
  
  dropdownTitle.textContent = 'Category';
  cancelButton.textContent = 'Cancel';
  submitButton.textContent = 'Submit';
  
  dateInput.addEventListener('click', dateSelect);
  dropdownTitle.addEventListener('click', toggleMenuDisplay);
  cancelButton.addEventListener('click', addTaskFormCancelHandler);
  submitButton.addEventListener('click', updateTasks);

  return addTaskFormContainer;
};

const createCategoryOptions = () => {
  const options = ['Personal', 'Work', 'Hobby', 'Learning'];
  const optionContainer = document.getElementById('option-container');

  options.forEach((option, index) => {
    const op = document.createElement('div', {
      id: `option-${index}`,
      class: 'option',
    });

    op.textContent = option;
    op.addEventListener('click', handleOptionSelected);
    optionContainer.appendChild(op);
  });
}

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
};

const addTaskFormCancelHandler = () => {
  document.getElementById('add-task-form-container').style.display = 'none';
  document.getElementById('add-task-input').value = '';
  document.getElementById('task-date').value = '';
  document.getElementById('add-task-description-input').value = '';
  document.getElementById('dropdown-title').textContent = 'Category';
};

const dateSelect = (e) => {
  const picker = datepicker('#task-date');
  e.stopPropagation();
  const isHidden = picker.calendarContainer.classList.contains('qs-hidden');
  picker[isHidden ? 'show' : 'hide']();
};

library.add(faAngleRight);
dom.watch();

export {
  createAddTaskForm,
  addTaskFormCancelHandler,
  handleTaskContainerDisplay,
  createCategoryOptions
};
