const cfg = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_form_error',
    errorClass: 'popup__error_visible'
};

function showInputError(formElement, inputElement, errorMessage, cfg) {
    const error = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(cfg.inputErrorClass);
    error.classList.add(cfg.errorClass);
    error.textContent = errorMessage;
};

function hideInputError(formElement, inputElement, cfg) {
    const error = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(cfg.inputErrorClass);
    error.classList.remove(cfg.errorClass);
    error.textContent = '';
};

const checkInputValidity = (formElement, inputElement, cfg) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, cfg);
    } else {
        hideInputError(formElement, inputElement, cfg);
    };
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};


