import './styles/modal.scss';
import { BaseComponent } from '../../utils/base-component';
import type { IModalWindow } from './types/modal-types';
import { modalParams } from './view/modal-view';

export class ModalWindow implements IModalWindow {
  overlay: HTMLElement = new BaseComponent({
    tag: 'div',
    className: ['overlay'],
  }).getElement();

  modal: HTMLElement = new BaseComponent(modalParams).getElement();

  title: HTMLElement;

  constructor(winnerName: string) {
    this.title = new BaseComponent({
      tag: 'h2',
      className: ['modal__title'],
      text: `Winner is ${winnerName}`,
    }).getElement();

    this.modal.prepend(this.title);
    this.overlay.append(this.modal);
    this.overlay.addEventListener('click', (event) => {
      this.removeModal(event);
    });
  }

  private removeModal(event: KeyboardEvent | MouseEvent): void {
    const modalOuter = event.target;
    if ((event instanceof MouseEvent
      && modalOuter !== null
      && modalOuter instanceof HTMLElement
      && (modalOuter.closest('.modal') === null || modalOuter.classList.contains('btn-modal')))
    ) {
      this.overlay.remove();
    }
  }

  public appendModal(): void {
    if (this.modal !== undefined) {
      document.body.append(this.overlay);
    }
  }
}
