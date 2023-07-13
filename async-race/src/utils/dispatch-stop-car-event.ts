export const dispatchStopCarEvent = (): void => {
  document.body.dispatchEvent(new CustomEvent('stopCar', { bubbles: true }));
};
