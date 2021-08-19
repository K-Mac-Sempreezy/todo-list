import format from 'date-fns/format';
import { createElement, createElementSVG } from './create-element.js';
import { initialLoadPageLabel, initialLoadPageIcon } from './variables.js';


const createContent = () => {

  const contentWrapper = createElement('div', {
    id: 'content-wrapper',
  });
  
  const taskWrapper = createElement('div', {
    id: 'task-wrapper',
  });

  const headerContainer = createElement('div', {
    id: 'content-header-container',
  });

  const labelContainer = createElement('div', {
    id: 'content-header-label-container',
  });

  const contentIcon = createElementSVG('http://www.w3.org/2000/svg', 'svg', {
    id: 'content-header-label-icon',
    class: '',
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

  contentIcon.innerHTML = initialLoadPageIcon;
  contentLabel.textContent = initialLoadPageLabel;
  date.textContent = format(new Date(), 'MMM do, yyyy');

  labelContainer.appendChild(contentIcon);
  labelContainer.appendChild(contentLabel);
  iconsContainer.appendChild(personIcon);
  iconsContainer.appendChild(chatIcon);
  iconsContainer.appendChild(settingsIcon);
  headerContainer.appendChild(labelContainer);
  headerContainer.appendChild(date);
  headerContainer.appendChild(iconsContainer);  
  contentWrapper.appendChild(headerContainer);
  contentWrapper.appendChild(taskWrapper);

  return contentWrapper;
};

export { createContent };
