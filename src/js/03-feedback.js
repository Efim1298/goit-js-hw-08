import throttle from 'lodash.throttle';

const inputEl = document.querySelector('.feedback-form input');
const textareaEl = document.querySelector('.feedback-form textarea');
const formEl = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

populateForm();

//відміна перезавантаження, сповіщення про заповнення даних, виведення в консоль, очещення полів і local storage
function onFormSubmit(e) {
  e.preventDefault();

  if (textareaEl.value === '' || inputEl.value === '') {
    return alert('Заповніть всі поля');
  }

  console.log(formData);

  e.currentTarget.reset();
  formData = {};
  localStorage.removeItem(STORAGE_KEY);
}

//заповнення введеними данними локального сховища
function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

//збереження даних після перезагрузки
function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {
    if (savedData.email) {
      inputEl.value = savedData.email;
      formData.email = savedData.email;
    }
    if (savedData.message) {
      textareaEl.value = savedData.message;
      formData.message = savedData.message;
    }
  }
}
