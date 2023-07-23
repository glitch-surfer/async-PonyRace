import type { ICarState } from '../types/car-types';

export class CarState implements ICarState {
  public selected: boolean = false;

  public animation: Animation | null = null;

  public isRace: boolean = false;

  public isStarted: boolean = false;

  public isDeleted: boolean = false;

  public isEngineStopped: boolean = false;
}
