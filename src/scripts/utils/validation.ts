import type {
  TCheckInputValidity,
  TClearValidation,
  TDisableSubmitButton,
  TEnableSubmitButton,
  TEnableValidation,
  THasInvalidInput,
  THideInputError,
  TSetEventListeners,
  TShowInputError,
  TToggleButtonState,
} from "./utils.types";

export const showInputError: TShowInputError = (
  formElement,
  inputElement,
  errorMessage = "",
  settings,
) => {
  const errorContent = formElement.querySelector(
    `#${inputElement.id}-error`,
  ) as HTMLSpanElement;
  errorContent.textContent = errorMessage;
  errorContent.classList.add(settings.errorClass);
  inputElement.classList.add(settings.inputErrorClass);
  disableSubmitButton(formElement, settings);
};

export const hideInputError: THideInputError = (
  formElement,
  inputElement,
  settings,
) => {
  const errorContent = formElement.querySelector(
    `#${inputElement.id}-error`,
  ) as HTMLSpanElement;
  errorContent.classList.remove(settings.errorClass);
  errorContent.textContent = "";
  inputElement.classList.remove(settings.inputErrorClass);
  enableSubmitButton(formElement, settings);
};

export const checkInputValidity: TCheckInputValidity = (
  formElement,
  inputElement,
  settings,
) => {
  if (!inputElement.validity.valid) {
    const errorContent = inputElement.validity.patternMismatch
      ? inputElement.dataset.errorMessage
      : inputElement.validationMessage;
    showInputError(formElement, inputElement, errorContent, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

export const hasInvalidInput: THasInvalidInput = (formElement, settings) => {
  const inputList: HTMLInputElement[] = Array.from(
    formElement.querySelectorAll(settings.inputSelector),
  );
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

export const disableSubmitButton: TDisableSubmitButton = (
  formElement,
  settings,
) => {
  const button = formElement.querySelector(
    settings.submitButtonSelector,
  ) as HTMLButtonElement;
  button.classList.add(settings.inactiveButtonClass);
  button.disabled = true;
};

export const enableSubmitButton: TEnableSubmitButton = (
  formElement,
  settings,
) => {
  const button = formElement.querySelector(
    settings.submitButtonSelector,
  ) as HTMLButtonElement;
  button.classList.remove(settings.inactiveButtonClass);
  button.disabled = false;
};

export const toggleButtonState: TToggleButtonState = (
  formElement,
  settings,
) => {
  hasInvalidInput(formElement, settings)
    ? disableSubmitButton(formElement, settings)
    : enableSubmitButton(formElement, settings);
};

export const setEventListeners: TSetEventListeners = (
  formElement,
  settings,
) => {
  const inputList: HTMLInputElement[] = Array.from(
    formElement.querySelectorAll(settings.inputSelector),
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(formElement, settings);
    });
  });
};

export const clearValidation: TClearValidation = (formElement, settings) => {
  const modalForm = formElement.querySelector(
    settings.formSelector,
  ) as HTMLFormElement;
  const inputList: HTMLInputElement[] = Array.from(
    modalForm.querySelectorAll(settings.inputSelector),
  );
  inputList.forEach((inputElement) => {
    hideInputError(modalForm, inputElement, settings);
  });
  toggleButtonState(modalForm, settings);
};

export const enableValidation: TEnableValidation = (settings) => {
  const formList: HTMLFormElement[] = Array.from(
    document.querySelectorAll(settings.formSelector),
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};
