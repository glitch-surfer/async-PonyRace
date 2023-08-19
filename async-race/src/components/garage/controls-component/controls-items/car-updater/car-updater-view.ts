import type { ICarUpdaterParams } from './car-updater-types';

export const carUpdaterView: ICarUpdaterParams = {
  updateCarInput: {
    tag: 'input',
    className: ['controls__upgrade-input'],
    attributes: {
      disabled: 'true',
    },
  },
  updateCarColorInput: {
    tag: 'input',
    className: ['controls__upgrade-input_color'],
    attributes: {
      type: 'color',
      disabled: '',
    },
  },
  updateCarBtn: {
    tag: 'button',
    className: ['controls__upgrade-btn', 'btn'],
    text: 'Upgrade',
    attributes: {
      disabled: 'true',
    },
  },
};
