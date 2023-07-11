import type { IWinnersParams } from '../types/winners-types';

export const winnersView: IWinnersParams = {
  wrapper: {
    tag: 'section',
    className: ['winners'],
  },
  title: {
    tag: 'h2',
    className: ['winners__title'],
  },
  subtitle: {
    tag: 'h3',
    className: ['winners__subtitle'],
    text: 'Page #1',
  },
  table: {
    tag: 'div',
    className: ['winners__table'],
  },
};
