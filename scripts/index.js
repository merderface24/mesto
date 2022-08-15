
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');
const profileEdit = document.querySelector('.profile__edit-button');
const popupForm = popup.querySelector('.popup__form')
const popupName = popup.querySelector('.popup__input_name');
const popupWork = popup.querySelector('.popup__input_work');
const popupClose = popup.querySelector('.popup__close-button');
const popupSave = popup.querySelector('.popup__save-button');


function openPopup () {
    popup.classList.toggle('popup_opened');
}

function closePopup () {
    popup.classList.remove('popup_opened');
    popupName.value = profileName.textContent;
    popupWork.value = profileWork.textContent;
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