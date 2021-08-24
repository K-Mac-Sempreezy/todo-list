
class MenuElement {
  constructor(
    title, //format: string, spinal-case
    svg, // format: link to svg html
    count = false,
    elementLabel, //format: string, first letter capitalized each word
    eventListenerObject = {} //format: {eventType: eventListener}
  ) {
    this.title = title;
    this.svg = svg;
    this.count = count;
    this.elementLabel = elementLabel;
    this.eventListenerObject = eventListenerObject;
  }
}

class Task {
  constructor(
    date,
    time,
    label,
    description,
    categoryColor,
    priorityColor,
    categoryLabel,
    priorityLabel,
    project,
    priorityCircleFill = 'none',
    person = false,
    avatar = false
  ) {
    this.date = date;
    this.time = time;
    this.label = label;
    this.description = description;
    this.categoryColor = categoryColor;
    this.priorityColor = priorityColor;
    this.categoryLabel = categoryLabel;
    this.priorityLabel = priorityLabel;
    this.project = project;
    this.priorityCircleFill = priorityCircleFill;
    this.person = person;
    this.avatar = avatar;
  }
}

class Project {
  constructor(
    name,
    date,
    time,
    description,
    categoryColor,
    priorityColor,
    categoryLabel,
    priorityLabel,
    priorityCircleFill = 'none',
  ) {
    this.name = name;
    this.date = date;
    this.time = time;
    this.description = description;
    this.categoryColor = categoryColor;
    this.categoryLabel = categoryLabel;
    this.priorityColor = priorityColor;
    this.priorityLabel = priorityLabel;
    this.priorityCircleFill = priorityCircleFill;
  }
}

export { Task, MenuElement, Project };
