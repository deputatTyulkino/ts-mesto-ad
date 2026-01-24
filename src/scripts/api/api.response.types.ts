export type TUser = {
  name: string;
  about: string;
  avatar: string;
  _id: string;
  cohort: string;
}

export type TCard = {
  likes: TUser[];
  _id: string;
  name: string;
  link: string;
  owner: TUser;
  createdAt: string;
}
