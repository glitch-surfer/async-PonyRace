export const clearElement = (...elements: HTMLElement[]): void => {
  elements.forEach((element) => {
    while (element.firstChild !== null) {
      element.firstChild.remove();
    }
  });
};
