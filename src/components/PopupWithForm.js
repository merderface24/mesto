import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitProfileForm) {
        super(popupSelector);
        this._handleSubmitProfileForm = handleSubmitProfileForm;
        this._formPopup = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    getPopupForm() {
        return this._formPopup;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formPopup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitProfileForm(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close()
        this._formPopup.reset();
      }
}