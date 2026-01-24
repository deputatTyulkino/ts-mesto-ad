import type { TCard } from "../../api/api.response.types";
import type { changeLikeCardStatus } from "../../api/api";
import type { THandlePreviewPicture, TShowInfoCard } from "../../index.types";

type TCreateCardElementFunc = {
  onPreviewPicture: THandlePreviewPicture;
  onShowInfoCard: TShowInfoCard;
};

export type TCreateCardElement = (
  data: TCard,
  { onPreviewPicture, onShowInfoCard }: TCreateCardElementFunc,
) => HTMLLIElement;

export type TRemoveCard = (
  id: TCard["_id"],
  card: HTMLLIElement,
  confirmButton: HTMLButtonElement,
) => void;

export type TLikeCard = (
  likeButton: HTMLButtonElement,
  id: TCard["_id"],
) => ReturnType<typeof changeLikeCardStatus>;
