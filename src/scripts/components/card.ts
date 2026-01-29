import { changeLikeCardStatus, deleteCard } from "../api/api.ts";
import { openConfirmModalWindow } from "./modal.ts";
import { getIdOwner } from "../utils/storage.ts";
import { fetchingButtonState, resetButtonState } from "./modal.ts";
import { getTemplate } from "../helpers/template.ts";
import { CardInfo } from "../helpers/modal_inf.ts";
import { ButtonText } from "../constants/button_text.ts";
import type {
  TCreateCardElement,
  TLikeCard,
  TRemoveCard,
} from "./types/card.types.ts";

const likeCard: TLikeCard = (likeButton, id) => {
  likeButton.classList.toggle("card__like-button_is-active");
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  return changeLikeCardStatus(id, isLiked);
};

export const removeCard: TRemoveCard = (id, cardElement, confirmButton) => {
  fetchingButtonState(confirmButton, ButtonText.FETCH_BUTTON_REMOVE_TEXT);
  deleteCard(id)
    .then((response) => {
      cardElement.remove();
      alert(response.message);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      resetButtonState(confirmButton, ButtonText.CONFIRM_BUTTON_TEXT);
    });
};

export const createCardElement: TCreateCardElement = (
  data,
  { onPreviewPicture, onShowInfoCard },
) => {
  const confirmModalWindow = document.querySelector(
    ".popup_type_remove-card",
  ) as HTMLDivElement;
  const confirmButton = confirmModalWindow.querySelector(
    ".popup__button",
  ) as HTMLButtonElement;
  const ownerId = getIdOwner();
  const cardElement = getTemplate();
  const likeButton = cardElement.querySelector(
    ".card__like-button",
  ) as HTMLButtonElement;
  const deleteButton = cardElement.querySelector(
    ".card__control-button_type_delete",
  ) as HTMLButtonElement;
  const infoButton = cardElement.querySelector(
    ".card__control-button_type_info",
  ) as HTMLButtonElement;
  const cardImage = cardElement.querySelector(
    ".card__image",
  ) as HTMLImageElement;
  const countLike = cardElement.querySelector(
    ".card__like-count",
  ) as HTMLParagraphElement;

  cardImage.src = data.link;
  cardImage.alt = data.name;
  (
    cardElement.querySelector(".card__title") as HTMLHeadingElement
  ).textContent = data.name;
  countLike.textContent = String(CardInfo.getCountLike(data.likes));

  const userLikes = data.likes.map((user) => user._id);
  if (userLikes.includes(ownerId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  infoButton.addEventListener("click", () => onShowInfoCard(data._id));

  likeButton.addEventListener("click", () => {
    likeButton.disabled = true;
    likeCard(likeButton, data._id)
      .then((response) => {
        countLike.textContent = String(CardInfo.getCountLike(response.likes));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        likeButton.disabled = false;
      });
  });

  if (ownerId === data.owner._id) {
    deleteButton.addEventListener("click", () => {
      openConfirmModalWindow(
        data._id,
        cardElement,
        confirmModalWindow,
        confirmButton,
      );
    });
  } else {
    deleteButton.style.display = "none";
  }

  if (onPreviewPicture) {
    cardImage.addEventListener("click", () =>
      onPreviewPicture({ name: data.name, link: data.link }),
    );
  }

  return cardElement;
};
