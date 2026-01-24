const ID_OWNER = "id";

export const setIdOwner = (id: string): void => {
  localStorage.setItem(ID_OWNER, id);
};

export const getIdOwner = (): string => localStorage.getItem(ID_OWNER) || "";
