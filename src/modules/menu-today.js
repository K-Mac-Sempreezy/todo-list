const createTodayMenu = () => {
  const todayContainer = document.createElement('div');
  todayContainer.setAttribute('id', 'today-container');
  todayContainer.setAttribute('data-nav', 'today');
  
  const todayIcon = document.createElement('div');
  todayIcon.setAttribute('class', 'icon-menu');
  todayIcon.setAttribute('id', 'today-icon');
  
  const todayLabel = document.createElement('p');
  todayLabel.textContent = 'Today';
  todayLabel.style.fontWeight = '700';
  
  todayContainer.appendChild(todayIcon);
  todayContainer.appendChild(todayLabel);
  
  todayContainer.addEventListener('click', createTaskContent);
  
  return todayContainer;
};

export { createTodayMenu };