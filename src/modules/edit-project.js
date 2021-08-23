import { myProjectsIndex, myTasksToDelete, setMyProjectsIndex, myTasks } from "./variables";

const projectTaskFilter = (projectName) => {
  console.log(projectName)
  return myTasks.filter(task => task.project === projectName)
}

// myTasks.forEach(task => setMyProjectsIndex(myTasks.indexOf(task.project === projectName)))

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

export { projectTaskFilter, sortMyProjectsByDate };