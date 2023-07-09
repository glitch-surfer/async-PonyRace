import type { ITrackParams } from '../types/track-types';

export const trackView: ITrackParams = {
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
};
