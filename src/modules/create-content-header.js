import format from 'date-fns/format';
import { createElement } from './create-element.js';
import { initialLoadPageLabel } from './variables.js';

const createContentHeader = () => {
  const headerContainer = createElement('div', {
    id: 'content-header-container',
  });

  const labelContainer = createElement('div', {
    id: 'content-header-label-container',
  });

  const contentLabel = createElement('h2', {
    id: 'content-header-label',
  });

  const date = createElement('div', {
    id: 'content-header-date',
  });

  const iconsContainer = createElement('div', {
    id: 'icons-container',
  });

  const personIcon = createElement('div', {
    class: 'icon-content',
    id: 'icon-person',
  });

  const chatIcon = createElement('div', {
    class: 'icon-content',
    id: 'icon-chat',
  });

  const settingsIcon = createElement('div', {
    class: 'icon-content',
    id: 'icon-settings',
  });

  contentLabel.textContent = initialLoadPageLabel;
  date.textContent = format(new Date(), 'MMM do, yyyy');

  labelContainer.appendChild(contentLabel);
  iconsContainer.appendChild(personIcon);
  iconsContainer.appendChild(chatIcon);
  iconsContainer.appendChild(settingsIcon);
  headerContainer.appendChild(labelContainer);
  headerContainer.appendChild(date);
  headerContainer.appendChild(iconsContainer);
  return headerContainer;
};

export { createContentHeader };
