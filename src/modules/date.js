import flatpickr from 'flatpickr';
require('flatpickr/dist/themes/confetti.css');

let picker;

const dateSelect = () => {
  if (picker) {return};
  picker = flatpickr('#task-date', {
    clickOpens: true,
    minDate: 'today',
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    altInput: true,
    altFormat: 'F j, Y H:i',
    dateFormat: 'Y-m-d H:i',
  });
};

const getPickerValue = () => {
  return picker.input.value;
}

const setPickerValue = (date) => {
  picker.setDate(date)
}

export { picker, setPickerValue, getPickerValue, dateSelect };
