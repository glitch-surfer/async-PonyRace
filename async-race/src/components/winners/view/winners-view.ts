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
    tag: 'table',
    className: ['winners__table'],
    children:
      [
        {
          tag: 'thead',
          className: ['winners__thead'],
          children: [
            {
              tag: 'tr',
              className: ['winners__head-row'],
              children: [
                {
                  tag: 'th',
                  className: ['winners__th_number'],
                  attributes: {
                    scope: 'col',
                  },
                  text: 'Number',
                },
                {
                  tag: 'th',
                  className: ['winners__th_car'],
                  attributes: {
                    scope: 'col',
                  },
                  text: 'Car',
                },
                {
                  tag: 'th',
                  className: ['winners__th_name'],
                  attributes: {
                    scope: 'col',
                  },
                  text: 'Name',
                },
                {
                  tag: 'th',
                  className: ['winners__th_wins'],
                  attributes: {
                    scope: 'col',
                  },
                  text: 'Wins',
                },
                {
                  tag: 'th',
                  className: ['winners__th_time'],
                  attributes: {
                    scope: 'col',
                  },
                  text: 'Best Time (seconds)',
                },
              ],
            },
          ],
        },
        {
          tag: 'tbody',
          className: ['winners__tbody'],
        },
      ],
  },
};
