import type { ICarParams } from '../types/car-types';

export const carView: ICarParams = {
  wrapper: {
    tag: 'li',
    className: ['car'],
  },
  selectBtn: {
    tag: 'button',
    className: ['car__select-btn'],
    text: 'Select',
  },
  removeBtn: {
    tag: 'button',
    className: ['car__remove-btn'],
    text: 'Remove',
  },
  title: {
    tag: 'h4',
    className: ['car__name'],
  },
  startBtn: {
    tag: 'button',
    className: ['car__start-btn'],
    text: 'A',
  },
  stopBtn: {
    tag: 'button',
    className: ['car__stop-btn'],
    text: 'B',
  },
  car: {
    tag: 'div',
    className: ['car__img'],
  },
};
