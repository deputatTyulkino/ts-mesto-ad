import { getTemplateInfoString, getTemplateUserCardInfo } from "./template.ts";
import { CardInfo, InfAboutCards } from "./modal_inf.ts";
import type { TCard } from "../api/api.response.types.ts";
import { CardInfo as CI } from "../constants/card_info.ts";
import type {
  TypeOfDescriptionParams,
  TypeOfTermsParams,
} from "./helpers.types.ts";

export class ModalContent {
  static appendInfoString = <
    T extends TypeOfTermsParams,
    D extends TypeOfDescriptionParams,
  >(
    list: HTMLDListElement,
    terms: T,
    descriptions: D,
  ) => {
    Object.entries(terms).forEach(([keyTerm, valueTerm]) => {
      list.append(
        ModalCardInfo.createInfoString(valueTerm, descriptions[keyTerm]),
      );
    });
  };

  static appendUserLikes = (list, users) => {
    users.forEach((user) => {
      list.append(ModalCardInfo.createSecInfoItem(user.name));
    });
  };

  static appendSecInfoString = (list, cards) => {
    const mostPopularCards = this.getPopularCards(cards);
    mostPopularCards.forEach((card) => {
      list.append(ModalCardInfo.createSecInfoItem(card.name));
    });
  };

  private static getPopularCards = (cards) => {
    const sortedCards = [...cards].sort(
      (card, nextCard) => card.likes.length - nextCard.likes.length,
    );
    const fivePopularCards = sortedCards.slice(-5);
    return fivePopularCards;
  };
}

class ModalCardInfo {
  static createInfoString = (term, description) => {
    const infoString = getTemplateInfoString();
    infoString.querySelector(".popup__info-term").textContent = term;
    infoString.querySelector(".popup__info-description").textContent =
      description;
    return infoString;
  };

  static createSecInfoItem = (name) => {
    const userTemplate = getTemplateUserCardInfo();
    userTemplate.textContent = name;
    return userTemplate;
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
