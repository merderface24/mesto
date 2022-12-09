export class Card {
    constructor(data, templateSelector, heandleOpenImage) {
        this._name = data.name
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._heandleOpenImage = heandleOpenImage;
    }
    _getTemplate() {
        const template = document.querySelector(this._templateSelector).content;
        const cardElement = template.querySelector('.element__grid').cloneNode(true)
        return cardElement
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementPhotoLink = this._element.querySelector('.element__photo')
        this._elementTitle = this._element.querySelector('.element__title')
        this._elementTrash = this._element.querySelector('.element__trash')
        this._elementLike = this._element.querySelector('.element__like');

        this._elementTitle.textContent = this._name;
        this._elementPhotoLink.src = this._link;
        this._elementPhotoLink.alt = this._name;

        this._setEventListeners()

        return this._element;
    }

    _hendleDeleteCard() {
        this._element.remove();
        this._element = null
    }

    _hendleFullImage() {
        this._heandleOpenImage(this._name, this._link)
    }

    _hendleLikeCard() {
        this._elementLike.classList.toggle('element__like_active')
    }

    _setEventListeners() {
        this._elementLike.addEventListener('click', () => {
            this._hendleLikeCard()
        });

        this._elementTrash.addEventListener('click', () => {
            this._hendleDeleteCard()
        });
        this._elementPhotoLink.addEventListener('click', () => {
            this._hendleFullImage()
        });
    }
}