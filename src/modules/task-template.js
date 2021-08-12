class Task {
  constructor(
    date,
    label,
    description,
    categoryColor,
    priorityColor,
    categoryLabel,
    priorityLabel,
    project = null,
    person = false,
    avatar = false
  ) {
    this.date = date;
    this.label = label;
    this.description = description;
    this.categoryColor = categoryColor;
    this.priorityColor = priorityColor;
    this.categoryLabel = categoryLabel;
    this.priorityLabel = priorityLabel;
    this.project = project;
    this.person = person;
    this.avatar = avatar;
  }
}

export { Task };