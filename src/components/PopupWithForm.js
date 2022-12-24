import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._saveButton = this._popup.querySelector('.popup__save-button');
    this._initialText = this._saveButton.textContent;
  }

  getFormPopup() {
    return this._form;
  }

  _getInputValues() {
    this._formValue = {};
    this._inputList.forEach((input) =>
     this._formValue[input.name] = input.value);
    return this._formValue;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name]
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._saveButton.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues())
      .then(() => {
        this.close();
      })
      .finally(() => {
        this._saveButton.textContent = this._initialText;
      })
    });
  }

  close() {
    super.close()
    this._form.reset();
  }
}
