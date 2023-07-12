export const dispatchUpdateWinnersEvent = (): void => {
  const event = new CustomEvent('updateWinners', {
    bubbles: true,
    cancelable: true,
  });
  document.body.dispatchEvent(event);
};
