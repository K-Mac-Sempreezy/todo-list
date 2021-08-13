import datepicker from 'js-datepicker';

const taskDate = document.getElementById('task-date');

const picker = datepicker(taskDate, {
  alwaysShow: true,
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString()
    input.value = value // => '1/1/2099'
  },
});

taskDate.addEventListener('click', e => {
  // THIS!!! Prevent Datepicker's event handler from hiding the calendar.
  e.stopPropagation()

  // Toggle the calendar.
  const isHidden = picker.calendarContainer.classList.contains('qs-hidden')
  picker[isHidden ? 'show' : 'hide']()
})

picker.show()

export { picker }