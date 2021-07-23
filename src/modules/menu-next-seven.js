const createNextSevenMenu = () => {
  const nextSevenContainer = document.createElement('div');
  nextSevenContainer.setAttribute('id', 'next-seven-container');
  nextSevenContainer.setAttribute('data-nav', 'next-seven');
  
  const nextSevenIcon = document.createElement('div');
  nextSevenIcon.setAttribute('class', 'icon-menu');
  nextSevenIcon.setAttribute('id', 'next-seven-icon');
  
  
  const nextSevenLabel = document.createElement('p');
  nextSevenLabel.textContent = 'Next 7 Days';

  nextSevenContainer.appendChild(nextSevenIcon);
  nextSevenContainer.appendChild(nextSevenLabel);

  // nextSevenContainer.addEventListener('click', createContent);

  return nextSevenContainer;
};

export { createNextSevenMenu };