import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../components/InitialCards.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// const popupEdit = document.querySelector(".popup_open_edit");
// const popupAdd = document.querySelector(".popup_open_add");
const popupFormEdit = document.querySelector(".popup-form-edit");
const popupFormAdd = document.querySelector(".popup-form-add");
// const popupName = document.querySelector(".popup__input_form_name");
// const popupWork = document.querySelector(".popup__input_form_work");
// const popupTitle = document.querySelector(".popup__input_form_title");
// const popupLink = document.querySelector(".popup__input_form_link");

const sectionContainer = document.querySelector(".element");

// const profileName = document.querySelector(".profile__name");
// const profileWork = document.querySelector(".profile__work");
const profileAdd = document.querySelector(".profile__add-button");
const profileEdit = document.querySelector(".profile__edit-button");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_form_error",
  errorClass: "popup__error_visible",
};

const formEditValid = new FormValidator(validationConfig, popupFormEdit);
const formAddValid = new FormValidator(validationConfig, popupFormAdd);
formEditValid.enableValidation();
formAddValid.enableValidation();

function createCard(element) {
  const newCard = new Card(element, "#element-tempalte", heandleOpenImage);
  return newCard.generateCard();
}

initialCards.forEach((item) => {
  const card = createCard(item);
  sectionContainer.prepend(card);
});

const newSectionCard = new Section({
  items: initialCards,
  render: (data) => {
    newSectionCard.addItem(createCard(data))
  },
},
  sectionContainer
);
newSectionCard.renderItems();

const PopupImage = new PopupWithImage('.popup_open_full-img')
PopupImage.setEventListeners();

const popupProfileEdit = new PopupWithForm('.popup_open_edit', (inputValues) => {
  popupProfileEdit.close()
  userInfo.setUserInfo(inputValues);
});
popupProfileEdit.setEventListeners();

const popupProfileAdd = new PopupWithForm('.popup_open_add', (Data) => {
  const card = createCard(Data);
  newSection.addItem(card);
  popupProfileAdd.close();
  formAddValid.setInActiveButton();
});
popupProfileAdd.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileWorkSelector: '.profile__work',
});

profileEdit.addEventListener('click', () => {
  popupProfileEdit.setInputValues(userInfo.getUserInfo());
  formEditValid.setInActiveButton();
  formEditValid.setEventListeners();
  popupProfileEdit.open();
});

// Слушатель кнопки открытия добавления фото
profileAdd.addEventListener('click', () => {
  formAddValid.setEventListeners();
   popupAddPhoto.open();
 });


// open and close popup
// function openPopup(popupOpened) {
//   popupOpened.classList.add("popup_opened");
//   document.addEventListener("keydown", closePopupByPressEscape);
// }

// function closePopup(popupClosed) {
//   popupClosed.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closePopupByPressEscape);
// }

// popupCloseButtons.forEach((buttonClose) => {
//   const popups = buttonClose.closest(".popup");
//   buttonClose.addEventListener("click", () => closePopup(popups));
// });

// //closing escape
// function closePopupByPressEscape(evt) {
//   if (evt.key === "Escape") {
//     const popupCloseEscape = document.querySelector(".popup_opened");
//     closePopup(popupCloseEscape);
//   }
// }

// //closing overlay
// function initClosePopupsByOverlayClick() {
//   popups.forEach((e) => {
//     e.addEventListener("click", (evt) => {
//       if (evt.target === evt.currentTarget) {
//         closePopup(e);
//       }
//     });
//   });
// }
// initClosePopupsByOverlayClick();

//Доделана отправка формы
// popupFormAdd.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const text = popupTitle.value;
//   const link = popupLink.value;
//   const objectPlace = {
//     name: text,
//     link: link,
//   };
//   sectionContainer.prepend(createCard(objectPlace));
//   formAddValid.setInActiveButton();
//   closePopup(popupAdd);
// });

// popupFormEdit.addEventListener("submit", (e) => {
//   e.preventDefault();
//   profileName.textContent = popupName.value;
//   profileWork.textContent = popupWork.value;
//   formEditValid.setInActiveButton();
//   closePopup(popupEdit);
// });
// //

// //
// profileEdit.addEventListener("click", () => {
//   openPopup(popupEdit);
//   popupName.value = profileName.textContent;
//   popupWork.value = profileWork.textContent;
// });

// profileAdd.addEventListener("click", () => {
//   openPopup(popupAdd);
//   popupFormAdd.reset("popup__save-button_disabled");
// });
//

function heandleOpenImage(name, link) {
  popupTitleImg.textContent = name;
  popupImg.src = link;
  popupImg.alt = name;
  openPopup(popupFullImage);
}