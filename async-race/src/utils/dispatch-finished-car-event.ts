import type { Car } from '../components/garage/track-component/car/car';

const dispatchFinishedCarEvent = (car: Car | null = null, time: number | null = null): void => {
  let event = new CustomEvent('finishedCar', {
    bubbles: true,
    cancelable: true,
  });

  if (car !== null && time !== null) {
    event = new CustomEvent('finishedCar', {
      bubbles: true,
      cancelable: true,
      detail: {
        car,
        time,
      },
    });
  }

  document.dispatchEvent(event);
};

export { dispatchFinishedCarEvent };
