import { next7TaskFilter } from './edit-task';
import { updateMenu } from './update-UI';
import { createTaskContent } from './create-task';

const createNext7Menu = (initialLoadPageLabel) => {
  const next7Container = createNext7Container();
  const next7Icon = createNext7Icon();
  const next7Label = createNext7Label(initialLoadPageLabel);
  const next7Count = createNext7Count();

  next7Container.appendChild(next7Icon);
  next7Container.appendChild(next7Label);
  next7Container.appendChild(next7Count);

  next7Container.addEventListener('click', createTaskContent);
  next7Container.addEventListener('click', updateMenu);

  return next7Container;
};

const createNext7Container = () => {
  const next7Container = document.createElement('div');
  next7Container.setAttribute('id', 'next-seven-container');
  next7Container.setAttribute('data-nav', 'next-seven');
  return next7Container;
};

const createNext7Icon = () => {
  const next7Icon = document.createElement('div');
  next7Icon.setAttribute('class', 'icon-menu');
  next7Icon.setAttribute('id', 'next-seven-icon');
  return next7Icon;
};

const createNext7Label = (initialLoadPageLabel) => {
  const next7Label = document.createElement('p');
  next7Label.setAttribute('id', 'menu-seven-label');
  next7Label.textContent = 'Next 7 Days';
  if (initialLoadPageLabel === 'Next 7 Days') {
    next7Label.style.fontWeight = '700';
  }
  return next7Label;
};

const createNext7Count = () => {
  const next7Count = document.createElement('p');
  next7Count.setAttribute('class', 'count');
  next7Count.setAttribute('id', 'menu-inbox-count');
  next7Count.textContent = next7TaskFilter().length;
  return next7Count;
};

export { createNext7Menu };
