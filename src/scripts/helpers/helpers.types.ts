import { CardInfo } from "../constants/card_info";
import type { ModalDescriptionContent } from "./modal_content";

export type TCardStatisticsTerms = Record<
  keyof typeof CardInfo.CARDS_STATISTICS_TERMS,
  string
>;

export type TCardInfoTerms = Record<
  keyof typeof CardInfo.INFO_CARD_TERMS,
  string
>;

export type TypeOfTermsParams = TCardStatisticsTerms | TCardInfoTerms;

export type TCardsDescription = ReturnType<
  typeof ModalDescriptionContent.createCardsDescriptionValues
>;

export type TDescriptionValues = ReturnType<
  typeof ModalDescriptionContent.createDescriptionValues
>;

export type TypeOfDescriptionParams = TDescriptionValues | TCardsDescription;
