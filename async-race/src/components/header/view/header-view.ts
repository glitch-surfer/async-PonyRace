import type { IHeaderParams } from '../types/header-types';

export const headerView: IHeaderParams = {
  header: {
    tag: 'header',
    className: ['header'],
  },
  nav: {
    tag: 'nav',
    className: ['nav'],
  },
  garageBtn: {
    tag: 'button',
    className: ['garage-btn', 'btn'],
    text: 'Garage',
  },
  winnersBtn: {
    tag: 'button',
    className: ['winners-btn', 'btn'],
    text: 'Winners',
  },
};
