export const decodeHtml = (html) => {
  const text = document.createElement("div");
  text.innerHTML = html;
  return text.textContent;
};
