import type { TCard, TUser } from "../api/api.response.types";

export class CardInfo {
  static getCountLike = (data: TCard["likes"]): number => data.length;
  static formatDate = (date: string): string =>
    new Date(date).toLocaleDateString();
}

export class InfAboutCards {
  static getUserMaxLikes = (cards: TCard[]) => {
    const cardsWithLikes = cards.filter((card) => card.likes.length);
    const cardsLikes = cardsWithLikes.flatMap(
      (card) => card.likes,
    ) satisfies TUser[];
    const userLikes = this.getUserLikesInfo(cardsLikes) satisfies Record<
      string,
      { name: string; likes: number }
    >;
    const userLikesInf = Object.values(userLikes) satisfies {
      name: string;
      likes: number;
    }[];
    return userLikesInf.reduce(
      (acc, user) => {
        return acc.likes > user.likes ? acc : user;
      },
      userLikesInf.at(0) as { name: string; likes: number },
    );
  };

  static getCountUsers = (cards: TCard[]): number => {
    const arrayUsersId = cards.map((card) => card.owner["_id"]);
    return new Set(arrayUsersId).size;
  };

  static getAllCountLikes = (cards: TCard[]): number => {
    return cards.reduce((acc, card) => (acc += card.likes.length), 0);
  };

  private static getUserLikesInfo = (data: TUser[]) => {
    return data.reduce(
      (acc, user) => {
        if (acc[user._id]) {
          acc[user._id].likes += 1;
          return acc;
        } else {
          acc[user._id] = {
            name: user.name,
            likes: 1,
          };
          return acc;
        }
      },
      {} as Record<string, { name: string; likes: number }>,
    );
  };
}
