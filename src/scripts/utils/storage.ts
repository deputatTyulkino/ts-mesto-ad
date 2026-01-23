const ID_OWNER = "id";

export const setIdOwner = (id: string) => {
  localStorage.setItem(ID_OWNER, id);
};

export const getIdOwner = () => localStorage.getItem(ID_OWNER);
