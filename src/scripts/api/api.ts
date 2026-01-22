import { type AxiosResponse } from "axios";
import type { TCard, TUser } from "../api.response.types.ts";
import { api } from "./config.ts";

const getResponseData = <T>(res: AxiosResponse<T>): T | Error => {
  return res.status === 200 ? res.data : new Error(`Error: ${res.status}`);
};

export const getUserInfo = async () => {
  const res = await api.get("/users/me");
  return getResponseData<TUser>(res);
};

export const getCardList = async () => {
  const res = await api.get("/cards");
  return getResponseData<TCard[]>(res);
};

export const setUserInfo = async ({
  name,
  about,
}: Pick<TUser, "name" | "about">) => {
  const res = await api.patch("/users/me", { name, about });
  return getResponseData<TUser>(res);
};

export const setAvatar = async (avatar: Pick<TUser, "avatar">) => {
  const res = await api.patch<TUser>("users/me/avatar", { avatar });
  return getResponseData(res);
};

export const addCard = async ({ name, link }: Pick<TCard, "name" | "link">) => {
  const res = await api.post("/cards", { name, link });
  return getResponseData<TCard>(res);
};

export const deleteCard = async (id: Pick<TCard, "_id">) => {
  const res = await api.delete(`/cards/${id}`);
  return getResponseData<{ message: string }>(res);
};

export const changeLikeCardStatus = async (
  cardID: Pick<TCard, "_id">,
  isLiked: boolean,
) => {
  const res = await api({
    method: isLiked ? "PUT" : "DELETE",
    url: `/cards/likes/${cardID}`,
  });
  return getResponseData(res);
};
