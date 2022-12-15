import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../components/InitialCards.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';


const popupFormEdit = document.querySelector(".popup-form-edit");
const popupFormAdd = document.querySelector(".popup-form-add");
const profileEdit = document.querySelector(".profile__edit-button");
const profileAdd = document.querySelector(".profile__add-button");

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

const createCard = (element) => {
  const newCard = new Card(element, '#element-tempalte', (name, link) => { popupFullImg.open(name, link) });
  return newCard.generateCard()
}

const newSectionCard = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = createCard(data);
    newSectionCard.addItem(card);
  }
}, '.element'
);

newSectionCard.renderItems();

const popupFullImg = new PopupWithImage('.popup_open_full-img');
popupFullImg.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_open_edit', (inputValue) => {
  userInfo.setUserInfo(inputValue);

  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

profileEdit.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  userInfo.getUserInfo();
  formEditValid.setInActiveButton();
  formEditValid.resetErrors();
  popupEditProfile.open();
});

const popupAddImage = new PopupWithForm('.popup_open_add', (data) => {
  const card = createCard({ name: data.inputTitle, link: data.inputLink });
  newSectionCard.addItem(card);
  popupAddImage.close();
  formAddValid.setInActiveButton();
});
popupAddImage.setEventListeners();

profileAdd.addEventListener('click', () => {
  formAddValid.resetErrors();
  popupAddImage.open();
});

const userInfo = new UserInfo({
  popupNameSelector: '.profile__name',
  popupWorkSelector: '.profile__work',
});