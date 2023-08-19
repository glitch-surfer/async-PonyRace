import type { ICreateCarParams } from './car-creator-types';

export const carCreatorView: ICreateCarParams = {
  createCarInput: {
    tag: 'input',
    className: ['controls__create-input'],
  },
  createCarColorInput: {
    tag: 'input',
    className: ['controls__create-input_color'],
    attributes: {
      type: 'color',
    },
  },
  createCarBtn: {
    tag: 'button',
    className: ['controls__create-btn', 'btn'],
    text: 'Create',
  },
};
