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
      className: ['controls__create-btn', 'btn'],
      text: 'Create',
    },
    upgradeCarInput: {
      tag: 'input',
      className: ['controls__upgrade-input'],
      attributes: {
        disabled: 'true',
      },
    },
    upgradeCarBtn: {
      tag: 'button',
      className: ['controls__upgrade-btn', 'btn'],
      text: 'Upgrade',
      attributes: {
        disabled: 'true',
      },
    },
    raceBtn: {
      tag: 'button',
      className: ['controls__race-btn', 'btn'],
      text: 'Race',
    },
    resetBtn: {
      tag: 'button',
      className: ['controls__reset-btn', 'btn'],
      text: 'Reset',
    },
    generateCarsBtn: {
      tag: 'button',
      className: ['controls__generate-btn', 'btn'],
      text: 'Generate',
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
      className: ['track__prev-btn', 'btn'],
      text: 'Prev',
    },
    nextBtn: {
      tag: 'button',
      className: ['track__next-btn', 'btn'],
      text: 'Next',
    },
  },
};
