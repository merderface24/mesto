 const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_form_error',
    errorClass: 'popup__error_visible'
};

function hasInvalidInput(inputList) {
    return inputList.some((inputList) => {
        return !inputList.validity.valid
    })
};

function setInActiveButton(buttonElement, cfg) {
    buttonElement.classList.add(cfg.inactiveButtonClass)
    buttonElement.disabled = true;
}
function setActiveButton(buttonElement, cfg) {
    buttonElement.classList.remove(cfg.inactiveButtonClass)
    buttonElement.disabled = false;
}

function toggleButtonState(inputList, buttonElement, cfg) {
    if (hasInvalidInput(inputList)) {
        setInActiveButton(buttonElement, cfg)
    } else {
        setActiveButton(buttonElement, cfg)
    }
};

function showInputError(formElement, inputElement, errorMessage, cfg) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(cfg.inputErrorClass);
    errorElement.classList.add(cfg.errorClass);
    errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, cfg) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(cfg.inputErrorClass);
    errorElement.classList.remove(cfg.errorClass);
    errorElement.textContent = '';
}

function toggleInputErrorState(formElement, inputElement, cfg) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, cfg);
    } else {
        hideInputError(formElement, inputElement, cfg)
    }
}

function setEventListeners(formElement, cfg) {
    const inputList = Array.from(formElement.querySelectorAll(cfg.inputSelector));
    const buttonElement = formElement.querySelector(cfg.submitButtonSelector)
    toggleButtonState(inputList, buttonElement, cfg);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            toggleInputErrorState(formElement, inputElement, cfg);
            toggleButtonState(inputList, buttonElement, cfg);
        });

    });
}

function enableValidation(cfg) {
    const formList = Array.from(document.querySelectorAll(cfg.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, cfg)
    })
}

enableValidation(validationConfig); 