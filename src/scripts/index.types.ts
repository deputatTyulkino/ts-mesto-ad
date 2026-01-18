import type { TCard } from "./api.response.types";

export type TShowInfoCard = (cardId: TCard["_id"]) => void;

export type THandlePreviewPicture = ({
  name,
  link,
}: {
  name: TCard["name"];
  link: TCard["link"];
}) => void;

export type THandleProfileFormSubmit = (evt: SubmitEvent) => void;

export type THandleAvatarFormSubmit = THandleProfileFormSubmit;

export type THandleCardFormSubmit = THandleProfileFormSubmit;
