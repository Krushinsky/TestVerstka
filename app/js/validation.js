const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const input = document.querySelector('.input-email');

function onInput() {
  if (isEmailValid(input.value)) {
    input.style.borderColor = 'green';
  } else {
    input.style.borderColor = 'red';
  }
}

input.addEventListener('input', onInput);

function isEmailValid(value) {
  return EMAIL_REGEXP.test(value);
}


function validation(form) {
  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains('error')) {
      parent.querySelector('.error-label').remove();
      parent.classList.remove('error');
    }
  }

  function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement('label');

    errorLabel.classList.add('error-label');
    errorLabel.textContent = text;

    parent.classList.add('error');

    parent.append(errorLabel);
  }

  let result = true;

  const allInputs = document.querySelectorAll('.box');

  for ( const input of allInputs) {
    removeError(input);

    if (input.value == '') {
      createError(input, 'required to fill out');
      result = false;
    }
  }
  return result;
}
document.getElementById('add-form').addEventListener('keyup', (event)=>{
  event.preventDefault();

  if (validation(this)== true && EMAIL_REGEXP.test(input.value)) {
    document.querySelector('.buttonbar__ok').classList.add('color');
  } else {
    document.querySelector('.buttonbar__ok').classList.remove('color');
  }
});