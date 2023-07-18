import type { Car } from '../components/garage/track-component/car/car';
import { Trace } from '../components/garage/track-component/car/trace/trace';

export const setTraceAnimation = (
  color: string,
  animationDistance: number,
  animationDuration: number,
  car: Car,
): void => {
  const startIntervalTime = Date.now();
  const speedCoefficient = animationDuration / 1000;
  const distancePerSecond = animationDistance / animationDuration;
  const endTime = startIntervalTime + animationDuration;

  const traceAnimation = (): void => {
    const trace = new Trace(color);
    const lastingTime = Date.now() - startIntervalTime;
    const coveredDistance = distancePerSecond * lastingTime;

    trace.draw(coveredDistance);
    car.getElement().append(trace.trace);

    if (Date.now() < endTime && !car.isEngineStopped) {
      setTimeout(() => { requestAnimationFrame(traceAnimation); }, 15 * speedCoefficient);
    }
  };

  requestAnimationFrame(traceAnimation);
};
