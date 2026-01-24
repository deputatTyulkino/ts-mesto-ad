import type { TCard } from "../../api/api.response.types";

export type TOpenConfirmModalWindow = (
  id: TCard["_id"],
  card: HTMLLIElement,
  confirmModalWindow: HTMLDivElement,
  confirmButton: HTMLButtonElement,
) => void;
