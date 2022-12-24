export default class UserInfo {
  constructor({name, work, avatar}) {
    this._name = document.querySelector(name);
    this._work = document.querySelector(work);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._work.textContent
    }
  }
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._work.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  setUserId(data) {
    return data._id;
  }

  getUserId() {
    return this._id;
  }
}

