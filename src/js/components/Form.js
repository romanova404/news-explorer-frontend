export class Form {
  constructor(formBlock) {
    this.formBlock = formBlock;
    this.inputEmail = formBlock.querySelector('.form__input_type_email');
    this.inputPassword = formBlock.querySelector('.form__input_type_password');
    this.inputName = formBlock.querySelector('.form__input_type_name');
  }

  setServerError(err) {
    this._clear();
    if (err == 404) {
      this.formBlock.querySelector('.server-error').textContent = "Пользователь не найден";
    } else if (err == 500) {
      this.formBlock.querySelector('.server-error').textContent = "На сервере произошла ошибка, попробуйте снова";
    } else if (err == 409) {
      this.formBlock.querySelector('.server-error').textContent = "Пользователь с таким почтовым ящиком уже был создан";
    } else if (err == 401) {
      this.formBlock.querySelector('.server-error').textContent = "Неправильные почта или пароль";
    }
  }

  setupValidation() {
    this.formBlock.elements.forEach((elem) => {
      if (elem.type !== 'submit') {
        elem.addEventListener('input', () => {
          this.formBlock.querySelector('.server-error').textContent = "";
          this._validateForm();
        })
      }
    })
  }

  _validateInputElement(elem) {
    const errorMessage = this.formBlock.querySelector(`#${elem.id}-error`);
      if (!elem.checkValidity()) {

        if (elem.value.length === 0) {
          errorMessage.textContent = "Это обязательное поле";
        } else if (elem.classList.contains('form__input_type_email')) {
          errorMessage.textContent = "Неправильный формат email";
        } else if (elem.classList.contains('form__input_type_password')) {
          errorMessage.textContent = "Минимальная длина пароля 8 знаков";
        } else {
          errorMessage.textContent = "Длина имени должна быть от 2 до 30 знаков";
        }
        return false;
      }
      errorMessage.textContent = "";
      return true;

  }

  _validateForm() {
    const validity = Array.from(this.formBlock.elements).filter(elem => elem.type !== 'submit').map(elem => this._validateInputElement(elem));
    if (validity.every(elem => elem)) {
      this.formBlock.querySelector('.form__button').disabled = false;
    } else {
      this.formBlock.querySelector('.form__button').disabled = true;
    }
  }

  _clear() {
    this.formBlock.reset();
    this.formBlock.querySelectorAll('error-message').textContent = "";
  }

  _getInfo() {
    let formInfo = {};
    for ( i = 0; i < (Array.from(this.formBlock.elements).length - 1); i++) {
      formInfo[this.formBlock.elements[i].name] = this.formBlock.elements[i].value;
    }
    return formInfo;
  }



}

