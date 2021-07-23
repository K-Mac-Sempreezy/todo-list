const createTodayHeader = () => {
  const container = createtodayHeaderContainer();
  const label = createContentLabel();
  const iconsContainer = createIconsContainer();
  const personIcon = createPersonIcon();
  const chatIcon = createChatIcon();
  const settingsIcon = createSettingsIcon();

  // document
  //   .getElementById('content-wrapper')
  //   .insertBefore(
  //     container,
  //     document.getElementById('add-task-form-container')
  //   );
  container.appendChild(label);
  iconsContainer.appendChild(personIcon);
  iconsContainer.appendChild(chatIcon);
  iconsContainer.appendChild(settingsIcon);
  container.appendChild(iconsContainer);
  return container;
};

const createtodayHeaderContainer = () => {
  const todayHeaderContainer = document.createElement('div');
  todayHeaderContainer.setAttribute('id', 'content-header-container');
  return todayHeaderContainer;
};

const createContentLabel = () => {
  const contentLabel = document.createElement('h2');
  contentLabel.textContent = 'Today';
  return contentLabel;
};

const createIconsContainer = () => {
  const iconsContainer = document.createElement('div');
  iconsContainer.setAttribute('id', 'icons-container');
  return iconsContainer;
};

const createPersonIcon = () => {
  const personIcon = document.createElement('div');
  personIcon.setAttribute('class', 'icon-content');
  personIcon.setAttribute('id', 'icon-person');
  return personIcon;
};

const createChatIcon = () => {
  const chatIcon = document.createElement('div');
  chatIcon.setAttribute('class', 'icon-content');
  chatIcon.setAttribute('id', 'icon-chat');
  return chatIcon;
};

const createSettingsIcon = () => {
  const settingsIcon = document.createElement('div');
  settingsIcon.setAttribute('class', 'icon-content');
  settingsIcon.setAttribute('id', 'icon-settings');
  return settingsIcon;
};

export { createTodayHeader };
