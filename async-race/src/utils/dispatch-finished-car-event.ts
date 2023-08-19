import type { Car } from '../components/garage/track-component/car/car';

export const dispatchFinishedEvent = (): void => {
  const event = new CustomEvent('finishedCar', {
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(event);
};

export const dispatchFinishedCarEvent = (car: Car, time: number): void => {
  const event = new CustomEvent('finishedCar', {
    bubbles: true,
    cancelable: true,
    detail: {
      car,
      time,
    },
  });
  document.dispatchEvent(event);
};
