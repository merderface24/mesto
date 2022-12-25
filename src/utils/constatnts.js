export const profileEdit = document.querySelector('.profile__edit-button');
export const profileAdd = document.querySelector('.profile__add-button');
export const profileAvatar = document.querySelector('.profile__new-avatar');
export const sectionElement = '.element';

export const apiOptions = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: '9c211265-bd29-43de-bbe3-be767972c134',
    'Content-Type': 'application/json'
  },
}

export const validationConfig = {
formSelector: '.popup__form',
inputSelector: '.popup__input',
submitButtonSelector: '.popup__save-button',
inactiveButtonClass: 'popup__save-button_disabled',
inputErrorClass: 'popup__input_form_error',
errorClass: 'popup__error_visible'
};

