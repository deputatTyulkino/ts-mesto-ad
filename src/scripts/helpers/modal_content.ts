import { getTemplateInfoString, getTemplateUserCardInfo } from "./template.ts";
import { CardInfo, InfAboutCards } from "./modal_inf.ts";
import type { TCard, TUser } from "../api/api.response.types.ts";
import {
  isCardInfoTerms,
  type TCardInfoTerms,
  type TCardStatisticsTerms,
  type TypeOfDescriptionParams,
  type TypeOfTermsParams,
} from "./helpers.types.ts";

export class ModalContent {
  static appendInfoString = <
    T extends TypeOfTermsParams,
    D extends TypeOfDescriptionParams,
  >(
    list: HTMLDListElement,
    terms: T,
    descriptions: D,
  ): void => {
    Object.entries(terms).forEach(([keyTerm, valueTerm]) => {
      if (isCardInfoTerms(descriptions)) {
        const value = descriptions[keyTerm as keyof TCardInfoTerms];
        list.append(
          ModalCardInfo.createInfoString<typeof value>(valueTerm, value),
        );
      } else {
        const value = descriptions[keyTerm as keyof TCardStatisticsTerms];
        list.append(
          ModalCardInfo.createInfoString<typeof value>(valueTerm, value),
        );
      }
    });
  };

  static appendUserLikes = (list: HTMLUListElement, users: TUser[]): void => {
    users.forEach((user) => {
      list.append(ModalCardInfo.createSecInfoItem(user.name));
    });
  };

  static appendSecInfoString = (
    list: HTMLUListElement,
    cards: TCard[],
  ): void => {
    const mostPopularCards = this.getPopularCards(cards);
    mostPopularCards.forEach((card) => {
      list.append(ModalCardInfo.createSecInfoItem(card.name));
    });
  };

  private static getPopularCards = (cards: TCard[]): TCard[] => {
    const sortedCards = [...cards].sort(
      (card, nextCard) => card.likes.length - nextCard.likes.length,
    );
    const fivePopularCards = sortedCards.slice(-5);
    return fivePopularCards;
  };
}

class ModalCardInfo {
  static createInfoString = <T extends string | number>(
    term: string,
    description: T,
  ) => {
    const infoString = getTemplateInfoString();
    const termElement = infoString.querySelector(
      ".popup__info-term",
    ) as HTMLElement;
    const descriptionElement = infoString.querySelector(
      ".popup__info-description",
    ) as HTMLElement;
    if (termElement && descriptionElement) {
      termElement.textContent = term;
      descriptionElement.textContent = String(description);
    }
    return infoString;
  };

  static createSecInfoItem = (name: string) => {
    const userTemplate = getTemplateUserCardInfo();
    userTemplate.textContent = name;
    return userTemplate satisfies HTMLLIElement;
  };
}

export class ModalDescriptionContent {
  static createDescriptionValues = (card: TCard) => {
    return {
      countLikes: CardInfo.getCountLike(card.likes),
      owner: card.owner.name,
      createdAt: CardInfo.formatDate(card.createdAt),
      name: card.name,
    };
  };

  static createCardsDescriptionValues = (cards: TCard[]) => {
    const { name, likes } = InfAboutCards.getUserMaxLikes(cards);
    return {
      countUsers: InfAboutCards.getCountUsers(cards),
      countLikes: InfAboutCards.getAllCountLikes(cards),
      maxLikesOnlyUser: likes,
      champOfLikes: name,
    };
  };
}
