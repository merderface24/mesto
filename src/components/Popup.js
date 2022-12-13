export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    };

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keydown", this._hendleEscClose);
    };

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._hendleEscClose);
    };

    _handleClickOverlay() {
        if (evt.target === evt.currentTarget) {
            this.close()
        };
    };

    _hendleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        };
    };

    setEventListeners() {
        const popupCloseButtons = this._popup.querySelector('.popup__close-button')
        popupCloseButtons.addEventListener("click", () => {
            this.close()
        });

    };

};