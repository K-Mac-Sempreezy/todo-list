import { todayTaskFilter, next7TaskFilter, inboxTaskSort } from './edit-task';

const createElement = (tagName, attributes) => {
  const element = document.createElement(tagName);
  Object.entries(attributes).forEach(([k, v]) => {
    element.setAttribute(k, v);
  });
  return element;
};

const createElementNS = (nameSpaceURI, qualifiedName, attributes) => {
  const NS = null;
  const element = document.createElementNS(nameSpaceURI, qualifiedName);
  Object.entries(attributes).forEach(([k, v]) => {
    element.setAttributeNS(NS, k, v);
  });
  return element;
};

const createElementSVG = (nameSpaceURI, qualifiedName, attributes) => {
  const element = document.createElementNS(nameSpaceURI, qualifiedName);
  Object.entries(attributes).forEach(([k, v]) => {
    element.setAttribute(k, v);
  });
  return element;
};

const createElementMenu = (
  title, //format: string, spinal-case
  svgContent, // format: link to svg html
  count = false,
  elementLabel, //format: string, first letter capitalized each word
  eventListenersObject //format: {eventType: eventListener}
) => {
  const container = createElement('div', {
    class: 'menu-element-container',
    id: `menu-${title}-element-container`,
  });

  const icon = createElementSVG('http://www.w3.org/2000/svg', 'svg', {
    class: 'menu-element-icon',
    id: `${title}-icon`,
  });

  const label = createElement('p', {
    class: 'menu-element-label',
    id: `menu-${title}-label`,
  });

  const countNumber = createElement('p', {
    class: 'count',
    id: `menu-${title}-count`,
  });

  icon.innerHTML = svgContent;
  label.textContent = elementLabel;
  if (title === 'inbox') {
    countNumber.textContent = inboxTaskSort().length;
  } else if (title === 'today') {
    countNumber.textContent = todayTaskFilter().length;
  } else if (title === 'next-seven') {
    countNumber.textContent = next7TaskFilter().length;
  }

  Object.entries(eventListenersObject).forEach(([key, value]) => {
    value.forEach(val => container.addEventListener(key, val));
  });

  container.appendChild(icon);
  container.appendChild(label);
  if (count === true) {
    container.appendChild(countNumber);
  }

  return container;
};

export { createElement, createElementNS, createElementSVG, createElementMenu };
