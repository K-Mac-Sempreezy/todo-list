import { createElement } from "./create-element.js"


const createOverlay = () => {
  const overlay = createElement('div', {
    id: 'overlay',
    class: 'overlay',
  })
  return overlay;
}

export { createOverlay };