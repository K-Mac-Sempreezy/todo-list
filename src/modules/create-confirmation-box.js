import { createElement } from './create-element.js';
import { deleteTask, toggleOverlay, toggleConfirm } from './update-UI.js';

const createConfirmContainer = () => {
  const confirmContainer = createElement('div', {
    id: 'confirm-container',
    class: '',
  });

  const confirmLabel = createElement('div', {
    id: 'confirm-label',
    class: '',
  });

  const confirmButtonContainer = createElement('div', {
    id: 'confirm-button-container',
    class: 'container',
  }); 

  const confirmCancelButton = createElement(
    'div',
    {
      id: 'confirm-cancel',
      class: 'confirm button',
      label: 'Cancel',
    },
    {
      click: [toggleConfirm, toggleOverlay],
    }
  );

  const confirmDeleteButton = createElement(
    'div',
    {
      id: 'confirm-delete',
      class: 'confirm button',
      label: 'Delete',
    },
    {
      click: [deleteTask, toggleOverlay, toggleConfirm],
    }
  );

  confirmLabel.textContent = 'Are you sure you want to delete this task?'
  confirmDeleteButton.textContent = 'Delete';
  confirmCancelButton.textContent = 'Cancel';
  confirmContainer.appendChild(confirmLabel);
  confirmContainer.appendChild(confirmButtonContainer);
  confirmButtonContainer.appendChild(confirmCancelButton);
  confirmButtonContainer.appendChild(confirmDeleteButton);

  return confirmContainer;
};

export { createConfirmContainer };
