export default class FormValidator {
  constructor(cfg, formElement) {
    this._cfg = cfg;
    this._formElement = formElement;
    this._inputSelector = cfg.inputSelector;
    this._submitButtonSelector = cfg.submitButtonSelector;
    this._inactiveButtonClass = cfg.inactiveButtonClass;
    this._inputErrorClass = cfg.inputErrorClass;
    this._errorClass = cfg.errorClass;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _hasInvalidInput() {
    return this._inputList.some((inputList) => {
      return !inputList.validity.valid
    });
  };

  _setButtonStateSave() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    };
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _toggleInputErrorState(inputElement) {
    this._hideInputError(inputElement);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  resetErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._setButtonStateSave();
  };

  _setEventListeners() {
    this._setButtonStateSave();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleInputErrorState(inputElement);
        this._setButtonStateSave();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}


