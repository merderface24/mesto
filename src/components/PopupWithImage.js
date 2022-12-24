import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__img');
    this._popupTitleImg = this._popup.querySelector('.popup__title-img');
  }

  open(element) {
    this._popupTitleImg.textContent = element.name;
    this._popupImg.src = element.link;
    this._popupImg.alt = element.name;
    super.open()
  };
};
