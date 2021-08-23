import { createElement } from './create-element.js';
import { deleteHandler, toggleOverlay, toggleConfirm } from './update-UI.js';

const createConfirmContainer = () => {
  const confirmContainer = createElement('div', {
    id: 'confirm-container',
    class: '',
    draggable: true,
  });

  const confirmLabel = createElement('div', {
    id: 'confirm-label',
    class: '',
  });

  const buttonContainer = createElement('div', {
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
      click: [deleteHandler, toggleOverlay, toggleConfirm],
    }
  );

  confirmLabel.textContent = 'Are you sure you want to delete this task?'
  confirmDeleteButton.textContent = 'Delete';
  confirmCancelButton.textContent = 'Cancel';
  confirmContainer.appendChild(confirmLabel);
  confirmContainer.appendChild(buttonContainer);
  buttonContainer.appendChild(confirmCancelButton);
  buttonContainer.appendChild(confirmDeleteButton);

  return confirmContainer;
};

export { createConfirmContainer };
