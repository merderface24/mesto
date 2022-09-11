// popup
const popupEdit = document.querySelector('.popup__edit');
const popupAdd = document.querySelector('.popup__add');
const popupForm = document.querySelector('.popup__form');
const popupFormEdit = document.querySelector('.popup-form-edit');
const popupFormAdd = document.querySelector('.popup-form-add');
const popupName = document.querySelector('.popup__input_form_name');
const popupWork = document.querySelector('.popup__input_form_work');
const popupTitle = document.querySelector('.popup__input_form_title');
const popupLink = document.querySelector('.popup__input_form_link');
const popupFullImage = document.querySelector('.popup__full-img');
const popupContainerImg = document.querySelector('.popup__container-img');
const popupImg = document.querySelector('.popup__img');
const popupTitleImg = document.querySelector('.popup__title-img');
// profile
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');
const profileEdit = document.querySelector('.profile__edit-button');
const profileAdd = document.querySelector('.profile__add-button');
const elements = document.querySelectorAll('.element');

const popupClose = document.querySelectorAll('.popup__close-button');

//stock cards
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// open and close popup
function openPopup(popupOpened) {
    popupOpened.classList.add('popup_opened');
};

function closePopup(popupClosed) {
    popupClosed.classList.remove('popup_opened');
};


popupClose.forEach((buttonClose) => {
    const popup = buttonClose.closest('.popup');
    buttonClose.addEventListener('click', () => closePopup(popup))
});

profileEdit.addEventListener('click', () => {
    openPopup(popupEdit);
    popupName.value = profileName.textContent;
    popupWork.value = profileWork.textContent;
});

profileAdd.addEventListener('click', () => {
    openPopup(popupAdd);
    popupFormAdd.reset();
});

popupFormEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileWork.textContent = popupWork.value;
    closePopup(popupEdit);
});

// add new cards
function createCard(element) {
    const newElement = elementTemplate.querySelector('.element__grid').cloneNode(true);
    const elementTitle = newElement.querySelector('.element__title');
    const elementPhotoLink = newElement.querySelector('.element__photo');
    const elementLike = newElement.querySelector('.element__like');
    const elementTrash = newElement.querySelector('.element__trash');


    elementTitle.textContent = element.name;
    elementPhotoLink.src = element.link;
    elementPhotoLink.alt = element.name;

    elementLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    elementTrash.addEventListener('click', function () {
        newElement.remove();
    });

    popupLink.addEventListener('click', (evt) => {
        popupTitle.textContent = evt.target.alt;
        popupContainerImg.src = evt.target.src;
        popupContainerImg.alt = evt.target.alt;
        openPopup(popupFullImage);
    });

    return newElement;
};

function addPhotoItem(elementAdd) {
    elements.prepend(createCard(elementAdd));
  };

initialCards.forEach(createElement);