import type { TCard } from "./api/api.response.types";

export type THandlePreviewPicture = ({
  name,
  link,
}: Pick<TCard, "name" | "link">) => void;

export type TShowInfoCard = (cardId: TCard["_id"]) => void;
