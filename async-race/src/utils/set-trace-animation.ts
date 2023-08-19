import type { Car } from '../components/garage/track-component/car/car';
import { Trace } from '../components/garage/track-component/car/trace/trace';

export const setTraceAnimation = (
  color: string,
  animationDistance: number,
  animationDuration: number,
  car: Car,
): void => {
  const startAnimationTime = Date.now();
  const endAnimationTime = startAnimationTime + animationDuration;
  const animationDelay = 15;
  const speedCoefficient = animationDuration / 1000;
  const distancePerSecond = animationDistance / animationDuration;

  const traceAnimation = (): void => {
    const trace = new Trace(color);
    const lastingTime = Date.now() - startAnimationTime;
    const coveredDistance = distancePerSecond * lastingTime;

    trace.draw(coveredDistance);
    car.getElement().append(trace.trace);

    if (Date.now() < endAnimationTime && !car.carState.isEngineStopped) {
      setTimeout(() => {
        requestAnimationFrame(traceAnimation);
      }, animationDelay * speedCoefficient);
    }
  };

  requestAnimationFrame(traceAnimation);
};
