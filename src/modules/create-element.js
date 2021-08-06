const createElement = (tagName, attributes) => {
  const element = document.createElement(tagName);
  Object.entries(attributes).forEach(([k, v]) => {
    element.setAttribute(k, v);
  });
  return element;
}
const createElementNS = (nameSpaceURI, qualifiedName, attributes) => {
  const NS = null;
  const element = document.createElementNS(nameSpaceURI, qualifiedName);
  Object.entries(attributes).forEach(([k, v]) => {
    element.setAttributeNS(NS, k, v);
  });
  return element;
}
const createElementSVG = (nameSpaceURI, qualifiedName, attributes) => {
  const NS = null;
  const element = document.createElementNS(nameSpaceURI, qualifiedName);
  Object.entries(attributes).forEach(([k, v]) => {
    element.setAttribute(k, v);
  });
  return element;
}

export { createElement, createElementNS, createElementSVG };