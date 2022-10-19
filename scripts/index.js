const popup = document.querySelectorAll(".popup")
const popupEdit = document.querySelector(".popup_open_edit");
const popupAdd = document.querySelector(".popup_open_add");
const popupFormEdit = document.querySelector(".popup-form-edit");
const popupFormAdd = document.querySelector(".popup-form-add");
const popupName = document.querySelector(".popup__input_form_name");
const popupWork = document.querySelector(".popup__input_form_work");
const popupTitle = document.querySelector(".popup__input_form_title");
const popupLink = document.querySelector(".popup__input_form_link");
const popupFullImage = document.querySelector(".popup_open_full-img");
const popupContainerImg = document.querySelector(".popup__container-img");
const popupImg = document.querySelector(".popup__img");
const popupTitleImg = document.querySelector(".popup__title-img");
const popupSaveButton = document.querySelector(".popup__save-button");

const sectionContainer = document.querySelector(".element");
const template = document.querySelector("#element-tempalte").content;

const profileName = document.querySelector(".profile__name");
const profileWork = document.querySelector(".profile__work");
const profileEdit = document.querySelector(".profile__edit-button");
const profileAdd = document.querySelector(".profile__add-button");
const popupCloseList = document.querySelectorAll(".popup__close-button");

//stock cards
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// open and close popup
function openPopup(popupOpened) {
  popupOpened.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupClickEscape);
};

function closePopup(popupClosed) {
  popupClosed.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupClickEscape);
};

popupCloseList.forEach((buttonClose) => {
  const popup = buttonClose.closest(".popup");
  buttonClose.addEventListener("click", () => closePopup(popup));
});

//closing escape
function closePopupClickEscape(evt) {
  if (evt.key === 'Escape') {
    const popupCloseEscape = document.querySelector(".popup_opened");
    closePopup(popupCloseEscape);
  };
};

//closing overlay
function closePopupClickOverlay() {
  popup.forEach((e) => {
    e.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(e);
      };
    });
  });
};
closePopupClickOverlay();

profileEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  popupName.value = profileName.textContent;
  popupWork.value = profileWork.textContent;
});

profileAdd.addEventListener("click", () => {
  openPopup(popupAdd);

  popupFormAdd.reset();
});

//Доделана отправка формы
popupFormAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const cardElement = new Object();
  cardElement.name = popupTitle.value,
    cardElement.link = popupLink.value,
    renderCard(cardElement);
  closePopup(popupAdd);
});

popupFormEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = popupName.value;
  profileWork.textContent = popupWork.value;
  closePopup(popupEdit);
});

// add new cards
function createCard(element) {
  const clone = template.querySelector(".element__grid").cloneNode(true);
  const elementTitle = clone.querySelector(".element__title");
  const elementPhotoLink = clone.querySelector(".element__photo");
  const elementLike = clone.querySelector(".element__like");
  const elementTrash = clone.querySelector(".element__trash");

  elementTitle.textContent = element.name;
  elementPhotoLink.src = element.link;
  elementPhotoLink.alt = element.name;

  //delete
  elementLike.addEventListener("click", function (e) {
    e.target.classList.toggle("element__like_active");
  });

  //like
  elementTrash.addEventListener("click", function () {
    clone.remove();
  });

  //full
  elementPhotoLink.addEventListener("click", () => {
    popupTitleImg.textContent = element.name;
    popupImg.src = element.link;
    popupImg.alt = element.name;
    openPopup(popupFullImage);
  });

  return clone;
};

function renderCard(e) {
  sectionContainer.prepend(createCard(e));
};

initialCards.forEach(renderCard);