import type { ICarParams } from '../types/car-types';

export const carView: ICarParams = {
  wrapper: {
    tag: 'li',
    className: ['car'],
  },
  selectBtn: {
    tag: 'button',
    className: ['car__select-btn', 'btn'],
  },
  removeBtn: {
    tag: 'button',
    className: ['car__remove-btn', 'btn'],
  },
  title: {
    tag: 'h4',
    className: ['car__name'],
  },
  startBtn: {
    tag: 'button',
    className: ['car__start-btn'],
  },
  stopBtn: {
    tag: 'button',
    className: ['car__stop-btn'],
    attributes: {
      disabled: '',
    },
  },
  car: {
    tag: 'div',
    className: ['car__img'],
  },
};
