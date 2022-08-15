
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileWork = document.querySelector('.profile__work');
let profileEdit = document.querySelector('.profile__edit-button');
let popupForm = popup.querySelector('.popup__form')
let popupName = popup.querySelector('.popup__name');
let popupWork = popup.querySelector('.popup__work');
let popupClose = popup.querySelector('.popup__close-button');
let popupSave = popup.querySelector('.popup__save-button');


let openPopup = function () {
    popup.classList.toggle('popup__opened');
}

let namePopup = function () {
    popupName.setAttribute('value', profileName.textContent);
    popupWork.setAttribute('value', profileWork.textContent);
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileWork.textContent = popupWork.value;
}

profileEdit.addEventListener('click', openPopup);
popupClose.addEventListener('click', openPopup);
popupSave.addEventListener('click', openPopup);
popupForm.addEventListener('submit', formSubmitHandler); 