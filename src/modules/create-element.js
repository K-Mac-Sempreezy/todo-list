const createElement = (tagName, attributes = {}, eventListeners = {}) => {
  const element = document.createElement(tagName);
  Object.entries(attributes).forEach(([k, v]) => {
    element.setAttribute(k, v);
  });
  Object.entries(eventListeners).forEach(([key, value]) => {
    if (value.length > 1) {
      value.forEach(val => element.addEventListener(key, val));
    } else {
      element.addEventListener(key, value);
    }
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

const createElementSVG = (
  nameSpaceURI,
  qualifiedName,
  attributes,
  eventListeners = {}
) => {
  const element = document.createElementNS(nameSpaceURI, qualifiedName);
  Object.entries(attributes).forEach(([k, v]) => {
    element.setAttribute(k, v);
  });
  Object.entries(eventListeners).forEach(([k, v]) => {
    element.addEventListener(k, v);
  });
  return element;
};

export { createElement, createElementNS, createElementSVG };
