import './trace.scss';
import { BaseComponent } from '../../../../../utils/base-component';
import type { ITrace } from './trace-types';

export class Trace implements ITrace {
  public trace = new BaseComponent({
    tag: 'div',
    className: ['trace'],
  }).getElement();

  constructor(color: string) {
    this.setColor(color);

    this.trace.addEventListener('DOMNodeInserted', () => {
      setTimeout(() => {
        this.trace.remove();
      }, 2000);
    });
  }

  public draw(x: number): void {
    this.trace.style.left = `${x}px`;
  }

  private setColor(color: string): void {
    this.trace.style.backgroundColor = color;
    this.trace.style.boxShadow = `0 0 2rem ${color}`;
  }
}
