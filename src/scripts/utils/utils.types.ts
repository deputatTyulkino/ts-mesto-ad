import type { TValidationSettings } from "../constants/global.constants";

export type TEnableValidation = (settings: TValidationSettings) => void;

export type TClearValidation = (
  formElement: HTMLDivElement,
  settings: TValidationSettings,
) => void;

export type TSetEventListeners = (
  formElement: HTMLFormElement,
  settings: TValidationSettings,
) => void;

export type TToggleButtonState = TSetEventListeners;

export type TEnableSubmitButton = TSetEventListeners;

export type TDisableSubmitButton = TSetEventListeners;

export type THasInvalidInput = (
  formElement: HTMLFormElement,
  settings: TValidationSettings,
) => boolean;

export type TCheckInputValidity = (
  formElement: HTMLFormElement,
  inputElement: HTMLInputElement,
  settings: TValidationSettings,
) => void;

export type THideInputError = TCheckInputValidity;

export type TShowInputError = (
  formElement: HTMLFormElement,
  inputElement: HTMLInputElement,
  errorMessage: string | undefined,
  settings: TValidationSettings,
) => void;
