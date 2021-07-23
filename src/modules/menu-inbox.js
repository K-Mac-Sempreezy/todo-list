const createInboxMenu = () => {
  const inboxContainer = document.createElement('div');
  inboxContainer.setAttribute('id', 'inbox-container');
  inboxContainer.setAttribute('data-nav', 'inbox');

  const inboxIcon = document.createElement('div');
  inboxIcon.setAttribute('class', 'icon-menu');
  inboxIcon.setAttribute('id', 'inbox-icon');
  
  const inboxLabel = document.createElement('p');
  inboxLabel.textContent = 'Inbox';

  const countContainer = document.createElement('div');
  countContainer.setAttribute('class', 'count-container');
  
  const inboxCount = document.createElement('p');
  inboxCount.setAttribute('class', 'count');
  inboxCount.textContent = '2';

  // inboxContainer.addEventListener('click', createInboxContent);
  
  
  countContainer.appendChild(inboxCount)
  inboxContainer.appendChild(inboxIcon);
  inboxContainer.appendChild(inboxLabel);
  inboxContainer.appendChild(countContainer);
  
  
  return inboxContainer;
};

export { createInboxMenu };