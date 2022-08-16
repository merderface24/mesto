
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');
const profileEdit = document.querySelector('.profile__edit-button');
const popupForm = popup.querySelector('.popup__form')
const popupName = popup.querySelector('.popup__input_form_name');
const popupWork = popup.querySelector('.popup__input_form_work');   
const popupClose = popup.querySelector('.popup__close-button');


function openPopup () {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupWork.value = profileWork.textContent;
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileWork.textContent = popupWork.value;
    closePopup();
}

profileEdit.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler); 