import throttle from 'lodash.throttle';

const KEY = 'feedback-form-state';
const formData = {};

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', formSubmit);
form.addEventListener('input', throttle(formInput, 500));

updateForm();

function updateForm() {
  const saveData = localStorage.getItem(KEY);
  if (saveData) {
    const { email, message } = JSON.parse(saveData);
    form.email.value = email;
    form.message.value = message;
    formData.email = email;
    formData.message = message;
  }
}

function formInput(event) {
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;
  localStorage.setItem(KEY, JSON.stringify(formData));
}

function formSubmit(event) {
  event.preventDefault();

  const formDataToSend = new FormData(event.currentTarget);
  formDataToSend.forEach((value, name) => {
    formData[name] = value;
  });

  event.currentTarget.reset();
  localStorage.removeItem(KEY);

  console.log(formData);


}


