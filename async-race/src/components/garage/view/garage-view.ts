import type { IGarageParams } from '../types/garage-types';

export const garageView: IGarageParams = {
  garage: {
    tag: 'section',
    className: ['garage'],
  },
  sectionControls: {
    wrapper: {
      tag: 'div',
      className: ['controls'],
      children:
        [
          {
            tag: 'h2',
            className: ['controls__title'],
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
      className: ['controls__create-input'],
    },
    createCarBtn: {
      tag: 'button',
      className: ['controls__create-btn'],
      text: 'Create Car',
    },
    upgradeCarInput: {
      tag: 'input',
      className: ['controls__upgrade-input'],
    },
    upgradeCarBtn: {
      tag: 'button',
      className: ['controls__upgrade-btn'],
      text: 'Upgrade Car',
    },
    raceBtn: {
      tag: 'button',
      className: ['controls__race-btn'],
      text: 'Race',
    },
    resetBtn: {
      tag: 'button',
      className: ['controls__reset-btn'],
      text: 'Reset',
    },
    generateCarsBtn: {
      tag: 'button',
      className: ['controls__generate-btn'],
      text: 'Generate Cars',
    },
  },
  track: {
    wrapper: {
      tag: 'div',
      className: ['track'],
    },
    title: {
      tag: 'h2',
      className: ['track__title'],
      text: 'Garage',
    },
    subtitle: {
      tag: 'h3',
      className: ['track__subtitle'],
      text: 'Page #1',
    },
    trackList: {
      tag: 'ul',
      className: ['track__list'],
    },
    prevBtn: {
      tag: 'button',
      className: ['track__prev-btn'],
      text: 'Prev',
    },
    nextBtn: {
      tag: 'button',
      className: ['track__next-btn'],
      text: 'Next',
    },
  },
};
