import { setMyProjectsIndex, myTasks, myProjects, setLocalStorage } from './variables';
import { populateForm } from './update-UI';
import { formatISO } from 'date-fns';

const editProject = e => {
  populateForm('Project', setMyProjectsIndex(e));
};

const projectTaskFilter = projectName => {
  return myTasks.filter(task => task.project === projectName);
};

const sortMyProjectsByDate = () => {
  if (myProjects.length > 1) {
    myProjects
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach(project => (project.date = formatISO(new Date(project.date))));
    setLocalStorage('myProjects', myProjects);
  } else {
    return;
  }
};

export { projectTaskFilter, sortMyProjectsByDate, editProject };
