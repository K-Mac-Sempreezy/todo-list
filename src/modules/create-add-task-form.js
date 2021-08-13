import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { createElement } from './create-element.js';
import {
  handleOptionSelected,
  updateTasks,
  toggleMenuDisplay,
  clearAddTaskForm,
} from './update-UI.js';

const createAddTaskForm = () => {
  const addTaskFormContainer = createElement('div', {
    id: 'add-task-form-container',
  });

  const formElement = createElement('form', {
    id: 'add-task-form',
  });

  const formTypeLabel = createElement('div', {
    id: 'add-task-form-type-label',
    class: '',
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

  const descriptionInput = createElement('p', {
    id: 'add-task-description-input',
  });

  const descriptionSpan = createElement('span', {
    id: 'description-span',
    class: 'textarea',
    role: 'textbox',
    contenteditable: 'true',
  });

  const dropdownWrapper = createElement('div', {
    id: 'dropdown-wrapper',
  });

  const dropdownContainerCategory = createElement('div', {
    id: 'add-task-dropdown-container-category',
    class: 'dropdown',
  });

  const dropdownTitleContainerCategory = createElement('div', {
    id: 'add-task-dropdown-title-container-category',
    class: 'container',
  });

  const dropdownTitleCategory = createElement('div', {
    id: 'dropdown-title-category',
    class: 'title pointer-cursor',
  });

  const dropdownIconCategory = createElement('div', {
    id: 'dropdown-icon-category',
    class: 'fa fa-angle-right icon',
  });

  const optionMenuCategory = createElement('div', {
    id: 'option-menu-category',
    class: 'menu pointer-cursor hide',
  });

  const dropdownContainerPriority = createElement('div', {
    id: 'add-task-dropdown-container-priority',
    class: 'dropdown',
  });

  const dropdownTitleContainerPriority = createElement('div', {
    id: 'add-task-dropdown-title-container-priority',
    class: 'container',
  });

  const dropdownTitlePriority = createElement('div', {
    id: 'dropdown-title-priority',
    class: 'title pointer-cursor',
  });

  const dropdownIconPriority = createElement('div', {
    id: 'dropdown-icon-priority',
    class: 'fa fa-angle-right icon',
  });

  const optionMenuPriority = createElement('div', {
    id: 'option-menu-priority',
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

  formElement.appendChild(formTypeLabel);

  topLineContainer.appendChild(taskNameInput);
  topLineContainer.appendChild(dateInputContainer);
  dateInputContainer.appendChild(dateInput);
  formElement.appendChild(topLineContainer);

  descriptionContainer.appendChild(descriptionInput);
  descriptionInput.appendChild(descriptionSpan);
  formElement.appendChild(descriptionContainer);

  dropdownTitleContainerCategory.appendChild(dropdownTitleCategory);
  dropdownTitleContainerCategory.append(dropdownIconCategory);
  dropdownContainerCategory.appendChild(dropdownTitleContainerCategory);
  dropdownContainerCategory.appendChild(optionMenuCategory);

  dropdownTitleContainerPriority.appendChild(dropdownTitlePriority);
  dropdownTitleContainerPriority.append(dropdownIconPriority);
  dropdownContainerPriority.appendChild(dropdownTitleContainerPriority);
  dropdownContainerPriority.appendChild(optionMenuPriority);

  dropdownWrapper.appendChild(dropdownContainerCategory);
  dropdownWrapper.appendChild(dropdownContainerPriority);
  formElement.appendChild(dropdownWrapper);

  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(submitButton);
  addTaskFormContainer.appendChild(formElement);
  addTaskFormContainer.appendChild(buttonContainer);

  dropdownTitleCategory.textContent = 'Category';
  dropdownTitlePriority.textContent = 'Priority';
  cancelButton.textContent = 'Cancel';
  submitButton.textContent = 'Submit';

  // dateInput.addEventListener('click', dateSelect);
  dateInput.addEventListener('click', () => {console.log(dateInput)});
  dropdownTitleContainerCategory.addEventListener('click', toggleMenuDisplay);
  dropdownTitleContainerPriority.addEventListener('click', toggleMenuDisplay);
  cancelButton.addEventListener('click', clearAddTaskForm);
  submitButton.addEventListener('click', updateTasks);

  return addTaskFormContainer;
};

const createDropdownOptions = () => {
  if (document.getElementById('category-0')) {
    return;
  }

  const categoryList = {
    Personal: '#050A30',
    Work: '#00FFFF',
    Hobby: '#ff6ec7',
    Learning: '#48CFAD',
  };

  const priorityList = {
    Urgent: '#ff0000',
    Medium: '#ffff00',
    Low: '#00FF00',
    None: '#0000ff ',
  };

  const categoryMenu = document.getElementById('option-menu-category');
  const priorityMenu = document.getElementById('option-menu-priority');

  Object.entries(categoryList).forEach(([k, v], index) => {
    const op = createElement('div', {
      id: `category-${index}`,
      class: 'option',
      'data-color': `${v}`,
    });

    op.textContent = k;
    op.addEventListener('click', handleOptionSelected);
    categoryMenu.appendChild(op);
  });

  Object.entries(priorityList).forEach(([k, v]) => {
    const op = createElement('div', {
      id: `category-${k}`,
      class: 'option',
      'data-color': `${v}`,
    });

    op.textContent = k;
    op.addEventListener('click', handleOptionSelected);
    priorityMenu.appendChild(op);
  });
};

library.add(faAngleRight);
dom.watch();

export { createAddTaskForm, createDropdownOptions };
