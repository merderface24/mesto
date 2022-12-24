export default class Card {
  constructor(data, templateSelector, { heandleOpenImage, handleLikeAdd, handleRemoveLike, handleTrash }, userId) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._heandleOpenImage = heandleOpenImage;
    this._owner = data.owner;
    this._handleLikeAdd = handleLikeAdd;
    this._handleRemoveLike = handleRemoveLike;
    this._handleTrash = handleTrash;
    this._likes = data.likes;
    this._likeArr = data.likes;
    this._userId = userId;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    const cardElement = template.querySelector('#container').cloneNode(true)
    return cardElement
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementPhotoLink = this._element.querySelector('.element__photo')
    this._elementTitle = this._element.querySelector('.element__title')
    this._elementTrash = this._element.querySelector('.element__trash')
    this._elementLike = this._element.querySelector('.element__like');
    this._elementLikeCount = this._element.querySelector('.element__like-counter');

    this._elementTitle.textContent = this._name;
    this._elementPhotoLink.src = this._link;
    this._elementPhotoLink.alt = this._name;
    this._elementLikeCount.textContent = this._likes.length;
    this._setLike(this._likes)

    if (this._userId !== this._owner._id) {
      this._elementTrash.remove();
    }

    this._setEventListeners();

    return this._element;
  }

  hendleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _hendleFullImage() {
    this._heandleOpenImage(this._name, this._link);
  }

  _hendleLikeCard() {
    if (this._elementLike.classList.contains('element__like_active')) {
      this._handleRemoveLike(this)
    } else {
      this._handleLikeAdd(this)
    }
  }

  _setLike(array) {
    if (array.find(el => el._id === this._userId)) {
      this._elementLike.classList.add('element__like_active');
    } else {
      this._elementLike.classList.remove('element__like_active');
    }
  }

  setLikeInfo(array) {
    this._likeArr = array;
    this._elementLikeCount.textContent = this._likeArr.length;
    this._setLike(this._likeArr);
  }

  _setEventListeners() {
    this._elementPhotoLink.addEventListener('click', () => {
      this._hendleFullImage();
    });
    this._elementTrash.addEventListener('click', () => {
      this._handleTrash();
    });
    this._elementLike.addEventListener('click', () => {
      this._hendleLikeCard();
    });
  }
}
