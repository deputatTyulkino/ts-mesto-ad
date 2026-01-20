import type { AxiosResponse } from "axios";
import type { TCard, TUser } from "../api.response.types";

type ReturnTypeResponse<T> = Promise<T> | Promise<never>;

export type TGetResponseData = <T>(res: AxiosResponse<T>) => T | Promise<never>;

export type TGetUserInfo<T> = () => ReturnTypeResponse<T>;

export type TGetCardList<T> = () => ReturnTypeResponse<T>;

export type TSetUserInfo<T> = ({
  name,
  about,
}: {
  name: TUser["name"];
  about: TUser["about"];
}) => ReturnTypeResponse<T>;

export type TSetAvatar<T> = (avatar: TUser["avatar"]) => ReturnTypeResponse<T>;

export type TAddCard<T> = ({
  name,
  link,
}: {
  name: TCard["name"];
  link: TCard["link"];
}) => ReturnTypeResponse<T>;

export type TDeleteCard<T> = (id: TCard["_id"]) => ReturnTypeResponse<T>;

export type TChangeLikeCardStatus<T> = (
  cardID: TCard["_id"],
  isLiked: boolean,
) => ReturnTypeResponse<T>;
