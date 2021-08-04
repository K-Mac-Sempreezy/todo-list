import format from 'date-fns/format';

const createContentHeader = (headerLabel) => {
  const headerContainer = createHeaderContainer();
  const labelContainer = createLabelContainer();
  const label = createContentLabel(headerLabel);
  const date = createDate();
  const iconsContainer = createIconsContainer();
  const personIcon = createPersonIcon();
  const chatIcon = createChatIcon();
  const settingsIcon = createSettingsIcon();

  headerContainer.appendChild(labelContainer);
  labelContainer.appendChild(label);
  headerContainer.appendChild(date);
  iconsContainer.appendChild(personIcon);
  iconsContainer.appendChild(chatIcon);
  iconsContainer.appendChild(settingsIcon);
  headerContainer.appendChild(iconsContainer);
  return headerContainer;
};

const createHeaderContainer = () => {
  const todayHeaderContainer = document.createElement('div');
  todayHeaderContainer.setAttribute('id', 'content-header-container');
  return todayHeaderContainer;
};

const createLabelContainer = () => {
  const container = document.createElement('div');
  container.setAttribute('id', 'today-header-label-container');
  return container;
}


const createContentLabel = (headerLabel) => {
  const contentLabel = document.createElement('h2');
  contentLabel.textContent = headerLabel;
  return contentLabel;
};

const createDate = () => {
  const date = document.createElement('div');
  const now = format(new Date(), 'MMM do, yyyy');
  date.setAttribute('id', 'today-header-date');
  date.textContent = now;
  return date;
}

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

export { createContentHeader };
