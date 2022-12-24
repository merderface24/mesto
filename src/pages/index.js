import { sectionElement, profileEdit, profileAdd, validationConfig, profileAvatar, apiOptions } from "../utils/constatnts.js";
import "./index.css";

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

let userId = '';
let cardId = '';
let cardTrash = '';

const api = new Api(apiOptions);

const formValidator = new Object();

const newSectionCard = new Section({
  renderer: (data) => {
    newSectionCard.addItem(createCard(data));
  },
},
  sectionElement
);

const promises = [api.getUserInfo(), api.getInitialCards()]
Promise.all(promises)
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserId(userData);
    userId = userData._id
    newSectionCard.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(`${err}`)
  });

const enableValidity = (el) => {
  const form = Array.from(document.querySelectorAll(el.formSelector))
  form.forEach((form) => {
    const validator = new FormValidator(el, form)
    const name = form.getAttribute('name')
    formValidator[name] = validator;
    validator.enableValidation();
  });
};

enableValidity(validationConfig);

function createCard(element) {
  const newCard = new Card(element, '#element-tempalte', {
    heandleOpenImage: () => {
      popupFullImg.open(element);
    },

    handleLikeAdd: () => {
      api.addLikeCard(element._id)
        .then((obj) => {
          newCard.setLikeInfo(obj.likes);
        })
        .catch((err) => {
          console.log('Ошибка при лайке', err);
        })
    },

    handleRemoveLike: () => {
      api.removeLikeCard(element._id)
        .then((obj) => {
          newCard.setLikeInfo(obj.likes);
        })
        .catch((err) => {
          console.log('Ошибка удаления лайка', err);
        })
    },

    handleTrash: () => {
      popupDelete.open(element);
      cardId = element._id;
      cardTrash = newCard;
    }
  },
    userId
  );
  return newCard.generateCard();
};

const popupFullImg = new PopupWithImage('.popup_open_full-img')
popupFullImg.setEventListeners();


const popupAddImage = new PopupWithForm({
  popupSelector: '.popup_open_add',
  handleFormSubmit: (data) => {
    return api.generateCard(data.name, data.link)
      .then((data) => {
        newSectionCard.addItem(createCard(data));
      })
      .catch((err) => {
        console.log('Ошибка добавления карточки', err);
      })
  },
});
popupAddImage.setEventListeners();

profileAdd.addEventListener('click', () => {
  popupAddImage.open();
  const formAdd = popupAddImage.getFormPopup();
  formValidator[formAdd.getAttribute('name')].resetErrors();
});

const userInfo = new UserInfo({
  name: '.profile__name',
  work: '.profile__work',
  avatar: '.profile__avatar'
});

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_open_edit',
  handleFormSubmit: (userData) => {
    return api.setUserInfo(userData.name, userData.about)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log('Ошибка редактирования профиля', err)
      })
  }
});
popupEditProfile.setEventListeners();

profileEdit.addEventListener('click', () => {
  popupEditProfile.open();
  const formEdit = popupEditProfile.getFormPopup();
  const data = userInfo.getUserInfo();
  popupEditProfile.setInputValues(data);
  formValidator[formEdit.getAttribute('name')].resetErrors();
});

profileAvatar.addEventListener('click', () => {
  popupAvatar.open();
  const formAvatar = popupAvatar.getFormPopup();
  formValidator[formAvatar.getAttribute('name')].resetErrors()
});

const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_new_avatar',
  handleFormSubmit: (userData) => {
    return api.setUserAvatar(userData.avatar)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log('Ошибка редактирования аватара', err);
      })
  },
});
popupAvatar.setEventListeners();

const popupDelete = new PopupWithForm({
  popupSelector: '.popup_delete_card',
  handleFormSubmit: () => {
    return api.deleteCard(cardId)
      .then(() => {
        cardTrash.hendleDeleteCard();
      })
      .catch((err) => {
        console.log('Ошибка при подтверждении удаления карточки', err);
      })
  },
});
popupDelete.setEventListeners();
