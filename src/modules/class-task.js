class Task {
  constructor(
    date,
    priorityColor,
    label,
    description,
    category,
    currentMyTasksIndex = null,
    project = null,
    person = false,
    avatar = false
  ) {
    this.date = date;
    this.priorityColor = priorityColor;
    this.label = label;
    this.description = description;
    this.category = category;
    this.currentMyTasksIndex = currentMyTasksIndex;
    this.project = project;
    this.person = person;
    this.avatar = avatar;
  }
}

export { Task };