import type { IHeaderParams } from '../types/header-types';

export const headerView: IHeaderParams = {
  header: {
    tag: 'header',
    className: ['header'],
    children: [
      {
        tag: 'h1',
        className: ['header__title'],
        text: 'Async PonyRace',
      },
    ],
  },
  nav: {
    tag: 'nav',
    className: ['nav'],
  },
  garageBtn: {
    tag: 'button',
    className: ['garage-btn', 'btn'],
    text: 'Hippodrome',
    attributes: {
      disabled: '',
    },
  },
  winnersBtn: {
    tag: 'button',
    className: ['winners-btn', 'btn'],
    text: 'Winners',
  },
};
