import '/src/style.css';
import { createMenu } from './create-menu.js';
import { createHeader } from './create-header.js';
import { createContent } from './create-content.js';
import { createAddTaskForm } from './create-add-task-form.js';
import { initializeContent } from './update-UI.js';
import { createConfirmContainer } from './create-confirmation-box.js';
import { createOverlay } from './create-overlay.js';
import { createDescriptionPopup } from './create-description-box.js';

const pageLoad = () => {
  document.body.appendChild(createHeader());
  document.body.appendChild(createMenu());
  document.body.appendChild(createAddTaskForm());
  document.body.appendChild(createContent());
  document.body.appendChild(createDescriptionPopup());
  document.body.appendChild(createConfirmContainer());
  document.body.appendChild(createOverlay());
  initializeContent();
};

export { pageLoad };
