/*
  Файл index.js является точкой входа в наше приложение
  и только он должен содержать логику инициализации нашего приложения
  используя при этом импорты из других файлов

  Из index.js не допускается что то экспортировать
*/

import {
  getCardList,
  getUserInfo,
  setUserInfo,
  setAvatar,
  addCard,
} from "./api/api.ts";
import { createCardElement } from "./components/card.ts";
import {
  openModalWindow,
  closeModalWindow,
  setCloseModalWindowEventListeners,
  fetchingButtonState,
  resetButtonState,
} from "./components/modal.ts";
import { setIdOwner } from "./utils/storage.ts";
import { enableValidation, clearValidation } from "./utils/validation.ts";
import {
  ModalDescriptionContent,
  ModalContent,
} from "./helpers/modal_content.ts";
import { ButtonText } from "./constants/button_text.ts";

import { CardInfo } from "./constants/card_info.ts";

import { isAxiosError } from "axios";
import type { TCard, TUser } from "./api.response.types.ts";

// Создание объекта с настройками валидации
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationSettings);

// DOM узлы
const placesWrap = document.querySelector(".places__list") as HTMLUListElement;
const profileFormModalWindow = document.querySelector(
  ".popup_type_edit",
) as HTMLDivElement;
const profileForm = profileFormModalWindow.querySelector(
  ".popup__form",
) as HTMLFormElement;
const profileTitleInput = profileForm.querySelector(
  ".popup__input_type_name",
) as HTMLInputElement;
const profileDescriptionInput = profileForm.querySelector(
  ".popup__input_type_description",
) as HTMLInputElement;
const profileEditButton = profileFormModalWindow.querySelector(
  ".popup__button",
) as HTMLButtonElement;

const cardFormModalWindow = document.querySelector(
  ".popup_type_new-card",
) as HTMLDivElement;
const cardForm = cardFormModalWindow.querySelector(
  ".popup__form",
) as HTMLFormElement;
const cardButton = cardFormModalWindow.querySelector(
  ".popup__button",
) as HTMLButtonElement;

const imageModalWindow = document.querySelector(
  ".popup_type_image",
) as HTMLDivElement;
const imageElement = imageModalWindow.querySelector(
  ".popup__image",
) as HTMLImageElement;
const imageCaption = imageModalWindow.querySelector(
  ".popup__caption",
) as HTMLParagraphElement;

const openProfileFormButton = document.querySelector(
  ".profile__edit-button",
) as HTMLButtonElement;
const openCardFormButton = document.querySelector(
  ".profile__add-button",
) as HTMLButtonElement;

const profileTitle = document.querySelector(
  ".profile__title",
) as HTMLHeadingElement;
const profileDescription = document.querySelector(
  ".profile__description",
) as HTMLParagraphElement;
const profileAvatar = document.querySelector(
  ".profile__image",
) as HTMLDivElement;

const avatarFormModalWindow = document.querySelector(
  ".popup_type_edit-avatar",
) as HTMLDivElement;
const avatarForm = avatarFormModalWindow.querySelector(
  ".popup__form",
) as HTMLFormElement;
const editAvatarButton = avatarFormModalWindow.querySelector(
  ".popup__button",
) as HTMLButtonElement;

const cardInfoModalWindow = document.querySelector(
  ".popup_type_info",
) as HTMLDivElement;
const titleModal = cardInfoModalWindow.querySelector(
  ".popup__title",
) as HTMLHeadingElement;
const listInfo = cardInfoModalWindow.querySelector(
  ".popup__info",
) as HTMLDListElement;
const subtitleModal = cardInfoModalWindow.querySelector(
  ".popup__text",
) as HTMLHeadingElement;
const secondaryListInfo = cardInfoModalWindow.querySelector(
  ".popup__list",
) as HTMLUListElement;

const headerLogo = document.querySelector(".header__logo") as HTMLImageElement;

const showAllCardsInfo = () => {
  getCardList()
    .then((cards) => {
      const description =
        ModalDescriptionContent.createCardsDescriptionValues(cards);
      const terms = CardInfo.CARDS_STATISTICS_TERMS;
      if (listInfo.textContent || secondaryListInfo.textContent) {
        listInfo.textContent = "";
        secondaryListInfo.textContent = "";
        titleModal.textContent = "";
        subtitleModal.textContent = "";
      }
      titleModal.textContent = CardInfo.CARDS_STATISTICS.title;
      subtitleModal.textContent = CardInfo.CARDS_STATISTICS.subtitle;
      ModalContent.appendInfoString(listInfo, terms, description);
      ModalContent.appendSecInfoString(secondaryListInfo, cards);
      openModalWindow(cardInfoModalWindow);
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        console.log(err.message);
      }
    });
};

const showInfoCard = (cardId: TCard["_id"]): void => {
  getCardList()
    .then((cards) => {
      const currentCard = cards.find((card) => card._id === cardId);
      const descriptions =
        ModalDescriptionContent.createDescriptionValues(currentCard);
      const terms = CardInfo.INFO_CARD_TERMS;
      if (listInfo.textContent || secondaryListInfo.textContent) {
        listInfo.textContent = "";
        secondaryListInfo.textContent = "";
        titleModal.textContent = "";
        subtitleModal.textContent = "";
      }
      titleModal.textContent = CardInfo.INFO_CARD.title;
      subtitleModal.textContent = CardInfo.INFO_CARD.subtitle;
      ModalContent.appendInfoString(listInfo, terms, descriptions);
      ModalContent.appendUserLikes(secondaryListInfo, currentCard?.likes);
      openModalWindow(cardInfoModalWindow);
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        console.log(err.message);
      }
    });
};

const handlePreviewPicture = ({
  name,
  link,
}: Pick<TCard, "name" | "link">): void => {
  imageElement.src = link;
  imageElement.alt = name;
  imageCaption.textContent = name;
  openModalWindow(imageModalWindow);
};

const handleProfileFormSubmit = (evt: SubmitEvent): void => {
  evt.preventDefault();
  fetchingButtonState(profileEditButton, ButtonText.FETCH_BUTTON_SAVE_TEXT);
  const form = evt.target as HTMLFormElement;
  setUserInfo({
    name: form["user-name"].value,
    about: form["user-description"].value,
  })
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModalWindow(profileFormModalWindow);
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        console.log(err.message);
      }
    })
    .finally(() => {
      resetButtonState(profileEditButton, ButtonText.BUTTON_SAVE_TEXT);
    });
};

const handleAvatarFormSubmit = (evt: SubmitEvent): void => {
  evt.preventDefault();
  const form = evt.target as HTMLFormElement;
  const avatarUrl = form["user-avatar"].value.trim();
  fetchingButtonState(editAvatarButton, ButtonText.FETCH_BUTTON_SAVE_TEXT);
  setAvatar(avatarUrl)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModalWindow(avatarFormModalWindow);
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        console.log(err.message);
      }
    })
    .finally(() => {
      resetButtonState(editAvatarButton, ButtonText.BUTTON_SAVE_TEXT);
    });
};

const handleCardFormSubmit = (evt: SubmitEvent): void => {
  evt.preventDefault();
  const form = evt.target as HTMLFormElement;
  const name = form["place-name"].value.trim();
  const link = form["place-link"].value.trim();
  fetchingButtonState(cardButton, ButtonText.FETCH_BUTTON_CREATE_TEXT);
  addCard({ name, link })
    .then((card) => {
      const cardElement = createCardElement(card, {
        onPreviewPicture: handlePreviewPicture,
        onShowInfoCard: showInfoCard,
      });
      placesWrap.prepend(cardElement);
      closeModalWindow(cardFormModalWindow);
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        console.log(err);
      }
    })
    .finally(() => {
      resetButtonState(cardButton, ButtonText.BUTTON_CREATE_TEXT);
    });
};

// EventListeners
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
headerLogo.addEventListener("click", showAllCardsInfo);

openProfileFormButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModalWindow(profileFormModalWindow);
  clearValidation(profileFormModalWindow, validationSettings);
});

profileAvatar.addEventListener("click", () => {
  avatarForm.reset();
  openModalWindow(avatarFormModalWindow);
  clearValidation(avatarFormModalWindow, validationSettings);
});

openCardFormButton.addEventListener("click", () => {
  cardForm.reset();
  openModalWindow(cardFormModalWindow);
  clearValidation(cardFormModalWindow, validationSettings);
});

//настраиваем обработчики закрытия попапов
const allPopups = document.querySelectorAll(
  ".popup",
) as NodeListOf<HTMLDivElement>;
allPopups.forEach((popup) => {
  setCloseModalWindowEventListeners(popup);
});

const setCards = (cards: TCard[]): void => {
  cards.forEach((card) => {
    placesWrap.append(
      createCardElement(card, {
        onPreviewPicture: handlePreviewPicture,
        onShowInfoCard: showInfoCard,
      }),
    );
  });
};

const setProfile = (data: TUser): void => {
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  setIdOwner(data._id);
};

Promise.all([getCardList(), getUserInfo()])
  .then(([cards, userData]) => {
    setCards(cards);
    setProfile(userData);
  })
  .catch((err) => {
    if (isAxiosError(err)) {
      console.log(err.message);
    }
  });
