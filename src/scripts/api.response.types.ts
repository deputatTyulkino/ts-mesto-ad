export interface TUser {
  name: string;
  about: string;
  avatar: string;
  _id: string;
  cohort: string;
}

export interface TCard {
  likes: TUser[];
  _id: string;
  name: string;
  link: string;
  owner: TUser;
  createdAt: string;
}
