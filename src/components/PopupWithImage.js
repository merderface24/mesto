import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = this._popup.querySelector('.popup__img')
        this._popupTitleImg = this._popup.querySelector('.popup__title-img')
    }

    open(name,link) {
        this._popupTitleImg.textContent = name;
        this._popupImg.src = link;
        this._popupImg.alt = name;
        super.open();
    }
}