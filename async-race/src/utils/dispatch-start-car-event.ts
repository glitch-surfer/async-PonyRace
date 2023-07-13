export const dispatchStartCarEvent = (): void => {
  document.body.dispatchEvent(new CustomEvent('startCar', { bubbles: true }));
};
