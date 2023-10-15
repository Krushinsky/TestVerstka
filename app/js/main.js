const modal = (options) => {
  const defaultOptions = {
    contentSelector: '',
    headerText: '',
    modalId: '',
    btnToShowSelector: '',
  };
  const finalOptions = Object.assign(defaultOptions, options);

  const body = document.body;

  function removeOriginalContent() {
    document.querySelector(finalOptions.contentSelector).remove();
  }

  function getContent() {
    const content = document.querySelector(finalOptions.contentSelector);
    const modalIdTpl = '{{modalId}}';
    const modalHeaderTpl = '{{modalHeader}}';
    const modalContentTpl = '{{modalContent}}';
    const template = `
      <div class="modal" id='{{modalId}}'>
          <div class="modal__container">
              <div class="modal__body">
                  <div class="modal__header">{{modalHeader}}</div>
                  <div class="modal__close">
                      <a href="#">
                          &times;
                      </a>
                  </div>
                  <div class="modal__content">
                      {{modalContent}}
                      <form action="#" class="form" id="add-form">
                      <p>Full Name </p>
                      <div class="input-box">
                      <input type="text" class="input-field box" placeholder="Your Name">
                      </div>
                      <p class="email">Email</p>
                      <div class="input-box">
                      <input type="email" class="input-field box input-email" placeholder="Your Email">
                      </div>
                      <p class="message">Message</p>
                      <div class="input-box">
                      <textarea type="text" class="input-field box input-message"></textarea>
                      </div>
                      </form>
                      <div class="modal__buttonbar">
                      <input type="submit" class="buttonbar__ok" value="SUBMIT">
                      </div>
                  </div>
              </div>
          </div>
      </div>
      `;

    const htmlToElements = (html) => {
      const tpl = document.createElement('template');
      html = html.trim();
      tpl.innerHTML = html;
      return tpl.content.firstChild;
    };
    const getModalContent = () => {
      const templated = template
          .replace(modalIdTpl, finalOptions.modalId)
          .replace(modalHeaderTpl, finalOptions.headerText)
          .replace(modalContentTpl, content.innerHTML);
      return htmlToElements(templated);
    };

    return getModalContent();
  }

  function initModal() {
    const modalElementContainer = getContent();
    removeOriginalContent();
    body.append(modalElementContainer);
    return modalElementContainer;
  }

  function initInteractions(modalElement) {
    const closeBtn = modalElement.querySelector('.modal__close a');
    const okBtn = modalElement.querySelector('.buttonbar__ok');


    const hide = (event) => {
      event && event.preventDefault();
      modalElement.classList.remove('visible');
      body.classList.remove('modal__visible');
    };

    const show = (event) => {
      event && event.preventDefault();
      modalElement.classList.add('visible');
      body.classList.add('modal__visible');
    };

    closeBtn.addEventListener('click', (event) => {
      hide(event);
    });
    okBtn.addEventListener('click', (event) => {
      hide(event);
      const newWin = window.open('about:blank', 'hello', 'width=200,height=200');

      newWin.document.write('Your message successfully sent'); ;
    });
    body.addEventListener('keyup', (event) => {
      if (event.code === 'Escape') {
        hide(event);
      }
    });
    body.addEventListener('click', (event) => {
      if (event.target == document.querySelector('.modal')) {
        hide(event);
      }
    });

    return {
      show,
      hide,
    };
  }

  function initShowBtn(showCallback) {
    const showBtn = document.querySelector(finalOptions.btnToShowSelector);
    showBtn.addEventListener('click', (event) => {
      event.preventDefault();
      showCallback();
      document.querySelector('.buttonbar__ok').classList.remove('color')

      document.querySelector('.form').reset();
    });
  }

  const modalElementContainer = initModal();
  const interactions = initInteractions(modalElementContainer);
  initShowBtn(interactions.show);

  return interactions;
};

function initModal() {
  modal({
    contentSelector: '.modal',
    headerText: 'SEND US MESSAGE',
    modalId: 'modalOne',
    btnToShowSelector: '#footerBtns',
  });
}

initModal();

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


