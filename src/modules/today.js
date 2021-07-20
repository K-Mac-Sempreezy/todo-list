
const createTodayHeader = () => {

  const todayHeaderContainer = document.createElement('div');
  todayHeaderContainer.setAttribute('id', 'content-header-container');
  
  const contentLabel = document.createElement('h2');
  contentLabel.textContent = 'Today';
  
  const iconsContainer = document.createElement('div');
  iconsContainer.setAttribute('id', 'icons-container');
  
  const personIcon = document.createElement('div');
  personIcon.setAttribute('class', 'icon-content');
  personIcon.setAttribute('id', 'icon-person');
  
  const chatIcon = document.createElement('div');
  chatIcon.setAttribute('class', 'icon-content');
  chatIcon.setAttribute('id', 'icon-chat');
  
  const settingsIcon = document.createElement('div');
  settingsIcon.setAttribute('class', 'icon-content');
  settingsIcon.setAttribute('id', 'icon-settings');

  iconsContainer.appendChild(personIcon);
  iconsContainer.appendChild(chatIcon);
  iconsContainer.appendChild(settingsIcon);
  todayHeaderContainer.appendChild(contentLabel);
  todayHeaderContainer.appendChild(iconsContainer);

  return todayHeaderContainer;
}

export { createTodayHeader }