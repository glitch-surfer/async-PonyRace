import type { ICarResponse } from '../../../../types/types';
import { BaseComponent } from '../../../../utils/base-component';
import type { ICar } from './types/car-types';
import { carView } from './view/car-view';

export class Car extends BaseComponent implements ICar {
  id: number;

  name: string;

  color: string;

  public selectBtn: HTMLElement;

  public removeBtn: HTMLElement;

  public title: HTMLElement;

  public startBtn: HTMLElement;

  public stopBtn: HTMLElement;

  public car: HTMLElement;

  constructor(carParams: ICarResponse) {
    super(carView.wrapper);

    this.id = carParams.id;
    this.name = carParams.name;
    this.color = carParams.color;

    this.selectBtn = new BaseComponent(carView.selectBtn).getElement();
    this.removeBtn = new BaseComponent(carView.removeBtn).getElement();
    this.title = new BaseComponent(carView.title).getElement();
    this.startBtn = new BaseComponent(carView.startBtn).getElement();
    this.stopBtn = new BaseComponent(carView.stopBtn).getElement();
    this.car = new BaseComponent(carView.car).getElement();

    this.setColor(this.color);
    this.setName(this.name);

    this.getElement().append(
      this.selectBtn,
      this.removeBtn,
      this.title,
      this.startBtn,
      this.stopBtn,
      this.car,
    );
  }

  private setColor(color: string): void {
    this.car.style.backgroundColor = color;
  }

  private setName(name: string): void {
    this.title.textContent = name;
  }
}
