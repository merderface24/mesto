export default class UserInfo {
    constructor({ popupNameSelector, popupWorkSelector }) {
        this._name = document.querySelector(popupNameSelector);
        this._work = document.querySelector(popupWorkSelector);

    }
    getUserInfo() {
        return {
            inputName: this._name.textContent,
            inputWork: this._work.textContent,
        }
    }

    setUserInfo({ inputName, inputWork }) {
        this._name.textContent = inputName;
        this._work.textContent = inputWork;
    }
}