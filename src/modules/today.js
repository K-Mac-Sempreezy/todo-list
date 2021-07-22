const createTodayHeader = () => {
  const todayHeaderContainer = document.createElement('div');
  todayHeaderContainer.setAttribute('id', 'content-header-container');

  const contentLabel = document.createElement('h2');
  contentLabel.textContent = 'Today';

  const iconsContainer = document.createElement('div');
  iconsContainer.setAttribute('id', 'icons-container');

  const personIcon = createElement('div', {
    id: 'icon-person',
    class: 'icon-content',
  });

  const chatIcon = createElement('div', {
    class: 'icon-content',
    id: 'icon-chat',
  });

  const settingsIcon = document.createElement('div');
  settingsIcon.setAttribute('class', 'icon-content');
  settingsIcon.setAttribute('id', 'icon-settings');

  iconsContainer.appendChild(personIcon);
  iconsContainer.appendChild(chatIcon);
  iconsContainer.appendChild(settingsIcon);
  todayHeaderContainer.appendChild(contentLabel);
  todayHeaderContainer.appendChild(iconsContainer);

  return todayHeaderContainer;
};

export { createTodayHeader };

function createElement(tagName, attributes) {
  const element = document.createElement(tagName);
  for (const [k, v] of attributes) {
    element.setAttribute(k, v);
  }
  return element;
}
