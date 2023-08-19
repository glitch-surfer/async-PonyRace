export const dispatchUpdateTrackEvent = (): void => {
  const updateTrackEvent = new CustomEvent('updateTrack', {
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(updateTrackEvent);
};
