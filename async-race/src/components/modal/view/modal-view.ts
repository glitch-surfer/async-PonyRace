import type { IParams } from '../../../types/types';

export const modalParams: IParams = {
  tag: 'div',
  className: ['modal'],
  children: [
    {
      tag: 'button',
      className: ['btn-modal'],
      text: '✖',
    },
  ],
};
