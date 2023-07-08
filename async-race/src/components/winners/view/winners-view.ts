import type { IWinnersParams } from '../types/winners-types';

export const winnersView: IWinnersParams = {
  wrapper: {
    tag: 'section',
    className: ['winners'],
  },
  title: {
    tag: 'h2',
    className: ['winners__title'],
    text: 'Winners',
  },
  subtitle: {
    tag: 'h3',
    className: ['winners__subtitle'],
    text: 'Page #1',
  },
  table: {
    tag: 'table',
    className: ['winners__table'],
  },
  btnPrev: {
    tag: 'button',
    className: ['winners__btn-prev', 'btn'],
    text: 'Prev',
  },
  btnNext: {
    tag: 'button',
    className: ['winners__btn-next', 'btn'],
    text: 'Next',
  },
};
