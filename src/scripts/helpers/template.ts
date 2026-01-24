export const getTemplate = () => {
  const template = document.getElementById(
    "card-template",
  ) as HTMLTemplateElement;
  const cardElement = template.content.querySelector(".card") as HTMLLIElement;
  return cardElement.cloneNode(true) as HTMLLIElement;
};

export const getTemplateUserCardInfo = () => {
  const template = document.getElementById(
    "popup-info-user-preview-template",
  ) as HTMLTemplateElement;
  const userCardInfoElement = template.content.querySelector(
    ".popup__list-item",
  ) as HTMLLIElement;
  return userCardInfoElement.cloneNode() as HTMLLIElement;
};

export const getTemplateInfoString = () => {
  const template = document.getElementById(
    "popup-info-definition-template",
  ) as HTMLTemplateElement;
  const infoStringElement = template.content.querySelector(
    ".popup__info-item",
  ) as HTMLDivElement;
  return infoStringElement.cloneNode(true) as HTMLDivElement;
};
