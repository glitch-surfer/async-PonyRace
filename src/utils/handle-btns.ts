export const disableBtns = (btns: HTMLElement[]): void => {
  btns.forEach((btn) => {
    btn.setAttribute('disabled', '');
  });
};

export const enableBtns = (btns: HTMLElement[]): void => {
  btns.forEach((btn) => {
    btn.removeAttribute('disabled');
  });
};
