import type { IPaginationParams } from '../types/pagination-types';

export const paginationView: IPaginationParams = {
  wrapper: {
    tag: 'div',
    className: ['pagination'],
  },
  prevBtn: {
    tag: 'button',
    className: ['pagination__prev', 'btn'],
    text: 'Prev',
    attributes: {
      disabled: '',
    },
  },
  nextBtn: {
    tag: 'button',
    className: ['pagination__next', 'btn'],
    text: 'Next',
  },
};
