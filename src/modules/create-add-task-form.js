import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { createElement, createElementSVG } from './create-element.js';
import { svgCalendarChoose } from './svg-variables.js';
import {
  colorLists, myProjects,
} from './variables.js';
import {
  handleOptionSelected,
  submitHandler,
  toggleMenuDisplay,
  clearForm,
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
    class: 'bold',
  });

  const topLineContainer = createElement('div', {
    id: 'add-task-top-line-container',
  });

  const taskNameInput = createElement('textarea', {
    id: 'add-task-input',
    class: 'textarea',
    type: 'text',
    placeholder: 'Add task label',
  });

  const dateInputContainer = createElement('div', {
    id: 'date-input-container',
  });

  const dateInput = createElement('input', {
    id: 'task-date',
    // type: 'text',
    placeholder: 'Choose date/time',
  });

  const calendar = createElementSVG('http://www.w3.org/2000/svg', 'svg', {
    class: '',
    id: `add-task-calendar-icon`,
  });

  const descriptionInput = createElement('textarea', {
    id: 'add-task-description-input',
    placeholder: 'Description...',
  });

  const dropdownWrapper = createElement('div', {
    id: 'dropdown-wrapper',
  });

  const dropdownContainerCategory = createElement('div', {
    id: 'add-task-dropdown-container-category',
    class: 'dropdown',
  });

  const dropdownTitleContainerCategory = createElement(
    'div',
    {
      id: 'add-task-dropdown-title-container-category',
      class: 'container',
    },
    {
      click: toggleMenuDisplay,
    }
  );

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

  const dropdownTitleContainerPriority = createElement(
    'div',
    {
      id: 'add-task-dropdown-title-container-priority',
      class: 'container',
    },
    {
      click: toggleMenuDisplay,
    }
  );

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


  const dropdownContainerProject = createElement('div', {
    id: 'add-task-dropdown-container-project',
    class: 'dropdown',
  });

  const dropdownTitleContainerProject = createElement(
    'div',
    {
      id: 'add-task-dropdown-title-container-project',
      class: 'container',
    },
    {
      click: toggleMenuDisplay,
    }
  );

  const dropdownTitleProject = createElement('div', {
    id: 'dropdown-title-project',
    class: 'title pointer-cursor',
  });

  const dropdownIconProject = createElement('div', {
    id: 'dropdown-icon-project',
    class: 'fa fa-angle-right icon',
  });

  const optionMenuProject = createElement('div', {
    id: 'option-menu-project',
    class: 'menu pointer-cursor hide display-none',
  });


  const buttonContainer = createElement('div', {
    id: 'add-task-form-button-container',
  });

  const cancelButton = createElement(
    'button',
    {
      class: 'button',
    },
    {
      click: clearForm,
    }
  );

  const submitButton = createElement(
    'button',
    {
      class: 'button',
    },
    { click: submitHandler }
  );

  formElement.appendChild(formTypeLabel);

  topLineContainer.appendChild(taskNameInput);
  topLineContainer.appendChild(dateInputContainer);
  dateInputContainer.appendChild(dateInput);
  dateInputContainer.appendChild(calendar);
  formElement.appendChild(topLineContainer);

  formElement.appendChild(descriptionInput);

  dropdownTitleContainerCategory.appendChild(dropdownTitleCategory);
  dropdownTitleContainerCategory.append(dropdownIconCategory);
  dropdownContainerCategory.appendChild(dropdownTitleContainerCategory);
  dropdownContainerCategory.appendChild(optionMenuCategory);

  dropdownTitleContainerPriority.appendChild(dropdownTitlePriority);
  dropdownTitleContainerPriority.append(dropdownIconPriority);
  dropdownContainerPriority.appendChild(dropdownTitleContainerPriority);
  dropdownContainerPriority.appendChild(optionMenuPriority);

  dropdownTitleContainerProject.appendChild(dropdownTitleProject);
  dropdownTitleContainerProject.append(dropdownIconProject);
  dropdownContainerProject.appendChild(dropdownTitleContainerProject);
  dropdownContainerProject.appendChild(optionMenuProject);

  dropdownWrapper.appendChild(dropdownContainerCategory);
  dropdownWrapper.appendChild(dropdownContainerPriority);
  dropdownWrapper.appendChild(dropdownContainerProject);
  formElement.appendChild(dropdownWrapper);

  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(submitButton);
  addTaskFormContainer.appendChild(formElement);
  addTaskFormContainer.appendChild(buttonContainer);

  calendar.innerHTML = svgCalendarChoose;
  dropdownTitleCategory.textContent = 'Category';
  dropdownTitlePriority.textContent = 'Priority';
  dropdownTitleProject.textContent = 'Project';
  cancelButton.textContent = 'Cancel';
  submitButton.textContent = 'Submit';

  return addTaskFormContainer;
};

const createDropdownOptions = () => {
  if (document.getElementById('category-0')) {
    return;
  }

  const categoryMenu = document.getElementById('option-menu-category');
  const priorityMenu = document.getElementById('option-menu-priority');
  const projectMenu = document.getElementById('option-menu-project');

  Object.entries(colorLists).forEach(([k, v]) => {
    Object.entries(v).forEach(([key, value], index) => {
      const op = createElement(
        'div',
        {
          id: `category-${index}`, // create dynamic name id ie cat vs priority
          class: 'option',
          'data-color': `${value}`,
          'data-key': index,
        },
        {
          click: handleOptionSelected,
        }
      );

      op.textContent = key;
      if (k === 'categoryColorList') {
        categoryMenu.appendChild(op);
      } else if (k === 'priorityColorList') {
        priorityMenu.appendChild(op);
      }
    });
  });

  myProjects.forEach((project, index) => {
    console.log(project)
    const op = createElement('div', {
      id: `priority-${index}`,
      class: 'option',
      'data-key': index,
    },
    {
      click: handleOptionSelected,
    })
    
    op.textContent = project.name;
    projectMenu.appendChild(op);
  });
};

library.add(faAngleRight);
dom.watch();

export { createAddTaskForm, createDropdownOptions };
