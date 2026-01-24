import { removeCard } from "./card.ts";
import type { TOpenConfirmModalWindow } from "./types/modal.types.ts";

const handleEscUp = (evt: KeyboardEvent): void => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(
      ".popup_is-opened",
    ) as HTMLDivElement | null;
    if (activePopup) {
      closeModalWindow(activePopup);
    }
  }
};

export const fetchingButtonState = (
  button: HTMLButtonElement,
  text: string,
) => {
  button.textContent = text;
  button.disabled = true;
  button.style.opacity = "0.7";
};

export const resetButtonState = (button: HTMLButtonElement, text: string) => {
  button.textContent = text;
  button.disabled = false;
  button.style.opacity = "1";
};

export const openModalWindow = (modalWindow: HTMLDivElement) => {
  modalWindow.classList.add("popup_is-opened");
  document.body.style.overflow = "hidden";
  document.addEventListener("keyup", handleEscUp);
};

export const closeModalWindow = (modalWindow: HTMLDivElement) => {
  modalWindow.classList.remove("popup_is-opened");
  document.body.style.overflow = "";
  document.removeEventListener("keyup", handleEscUp);
};

export const openConfirmModalWindow: TOpenConfirmModalWindow = (
  id,
  card,
  confirmModalWindow,
  confirmButton,
) => {
  openModalWindow(confirmModalWindow);
  confirmButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    removeCard(id, card, confirmButton);
    closeModalWindow(confirmModalWindow);
  });
};

export const setCloseModalWindowEventListeners = (
  modalWindow: HTMLDivElement,
) => {
  const closeButtonElement = modalWindow.querySelector(
    ".popup__close",
  ) as HTMLButtonElement;
  closeButtonElement.addEventListener("click", () => {
    closeModalWindow(modalWindow);
  });

  modalWindow.addEventListener("mousedown", (evt: MouseEvent) => {
    const modal = evt.target as HTMLDivElement;
    if (modal.classList.contains("popup")) {
      closeModalWindow(modalWindow);
    }
  });
};
