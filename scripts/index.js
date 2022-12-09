import { Card } from './Card.js';
import { initialCards } from './InitialCards.js';
import { FormValidator } from './FormValidator.js';

const popups = document.querySelectorAll(".popup")
const popupEdit = document.querySelector(".popup_open_edit");
const popupAdd = document.querySelector(".popup_open_add");
const popupFormEdit = document.querySelector(".popup-form-edit");
const popupFormAdd = document.querySelector(".popup-form-add");
const popupName = document.querySelector(".popup__input_form_name");
const popupWork = document.querySelector(".popup__input_form_work");
const popupTitle = document.querySelector(".popup__input_form_title");
const popupLink = document.querySelector(".popup__input_form_link");
const popupFullImage = document.querySelector(".popup_open_full-img");
const popupImg = document.querySelector(".popup__img");
const popupTitleImg = document.querySelector(".popup__title-img");

const sectionContainer = document.querySelector(".element");

const profileName = document.querySelector(".profile__name");
const profileWork = document.querySelector(".profile__work");
const profileEdit = document.querySelector(".profile__edit-button");
const profileAdd = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_form_error',
  errorClass: 'popup__error_visible'
};

const formEditValid = new FormValidator(validationConfig, popupFormEdit);
const formAddValid = new FormValidator(validationConfig, popupFormAdd);

profileEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  popupName.value = profileName.textContent;
  popupWork.value = profileWork.textContent;
  formEditValid._setEventListeners()
  formEditValid._enableValidation();
});

profileAdd.addEventListener("click", () => {
  openPopup(popupAdd);
  popupFormAdd.reset('popup__save-button_disabled');
  formAddValid._setEventListeners();
  formAddValid._enableValidation();
});

function createCard(element) {
  const newCard = new Card(element, '#element-tempalte', heandleOpenImage)
  return newCard.generateCard()
}

initialCards.forEach((item) => {
  const card = createCard(item)
  sectionContainer.prepend(card);
})


// open and close popup
function openPopup(popupOpened) {
  popupOpened.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByPressEscape);
};

function closePopup(popupClosed) {
  popupClosed.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByPressEscape);
};

popupCloseButtons.forEach((buttonClose) => {
  const popups = buttonClose.closest(".popup");
  buttonClose.addEventListener("click", () => closePopup(popups));
});

//closing escape
function closePopupByPressEscape(evt) {
  if (evt.key === 'Escape') {
    const popupCloseEscape = document.querySelector(".popup_opened");
    closePopup(popupCloseEscape);
  };
};

//closing overlay
function initClosePopupsByOverlayClick() {
  popups.forEach((e) => {
    e.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(e);
      };
    });
  });
};
initClosePopupsByOverlayClick();

//Доделана отправка формы
popupFormAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = popupTitle.value;
  const link = popupLink.value;
  const objectPlace = {
    name: text,
    link: link
  };
  sectionContainer.prepend(createCard(objectPlace));
  closePopup(popupAdd);
});

popupFormEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = popupName.value;
  profileWork.textContent = popupWork.value;
  closePopup(popupEdit);
});

function heandleOpenImage(name, link) {
  popupTitleImg.textContent = name;
  popupImg.src = link;
  popupImg.alt = name;
  openPopup(popupFullImage);
}

export { heandleOpenImage }




