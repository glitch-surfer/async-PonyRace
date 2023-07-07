import type { IGarageParams } from '../types/garage-types';

export const garageView: IGarageParams = {
  garage: {
    tag: 'main',
  },
  sectionControls: {
    wrapper: {
      tag: 'section',
      children:
        [
          {
            tag: 'h2',
            className: ['title'],
            text: 'Controls',
          },
        ],
    },
    controls: {
      tag: 'div',
      className: ['controls'],
    },
    createCarInput: {
      tag: 'input',
      className: ['create-car-input'],
    },
    createCarBtn: {
      tag: 'button',
      className: ['create-car-btn'],
      text: 'Create Car',
    },
    upgradeCarInput: {
      tag: 'input',
      className: ['upgrade-car-input'],
    },
    upgradeCarBtn: {
      tag: 'button',
      className: ['upgrade-car-btn'],
      text: 'Upgrade Car',
    },
    raceBtn: {
      tag: 'button',
      className: ['race-btn'],
      text: 'Race',
    },
    resetBtn: {
      tag: 'button',
      className: ['reset-btn'],
      text: 'Reset',
    },
    generateCarsBtn: {
      tag: 'button',
      className: ['generate-cars-btn'],
      text: 'Generate Cars',
    },
  },
};
