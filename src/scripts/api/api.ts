import type { TCard, TUser } from "../api.response.types.ts";
import type {
  TAddCard,
  TChangeLikeCardStatus,
  TDeleteCard,
  TGetCardList,
  TGetResponseData,
  TGetUserInfo,
  TSetAvatar,
  TSetUserInfo,
} from "./api.types.ts";
import { api } from "./config.ts";

const getResponseData: TGetResponseData = (res) => {
  return res.status === 200
    ? res.data
    : Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInfo: TGetUserInfo<TUser> = async () => {
  const res = await api.get("/users/me");
  return getResponseData(res);
};

export const getCardList: TGetCardList<TCard[]> = async () => {
  const res = await api.get("/cards");
  return getResponseData(res);
};

export const setUserInfo: TSetUserInfo<TUser> = async ({ name, about }) => {
  const res = await api.patch("/users/me", { name, about });
  return getResponseData(res);
};

export const setAvatar: TSetAvatar<TUser> = async (avatar) => {
  const res = await api.patch("users/me/avatar", { avatar });
  return getResponseData(res);
};

export const addCard: TAddCard<TCard> = async ({ name, link }) => {
  const res = await api.post("/cards", { name, link });
  return getResponseData(res);
};

export const deleteCard: TDeleteCard<TCard> = async (id) => {
  const res = await api.delete(`/cards/${id}`);
  return getResponseData(res);
};

export const changeLikeCardStatus: TChangeLikeCardStatus<TCard> = async (
  cardID,
  isLiked,
) => {
  const res = await api({
    method: isLiked ? "PUT" : "DELETE",
    url: `/cards/likes/${cardID}`,
  });
  return getResponseData(res);
};
