export default class UserInfo {
    constructor({popupNameSelector, popupWorkSelector}) {
        this._ppopupNameSelector = document.querySelector(popupNameSelector);
        this._popupWorkSelector = document.querySelector(popupWorkSelector);
    }

    getUserInfo() {
        return {
            popupNameSelector: this._popupNameSelector.textContent,
            popupWorkSelector: this._popupWorkSelector.textContent
        }
    } 

    setUserInfo() {
        this._popupNameSelector.textContent = popupNameSelector;
        this._popupWorkSelector.textContent = popupWorkSelector;
    }
}