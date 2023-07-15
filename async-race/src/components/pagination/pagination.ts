import './styles/pagination.scss';
import { BaseComponent } from '../../utils/base-component';
import type { IPagination } from './types/pagination-types';
import { paginationView } from './view/pagination-view';

export class Pagination extends BaseComponent implements IPagination {
  constructor(
    public currentPage: number = 1,
    public prevBtn: HTMLElement = new BaseComponent(paginationView.prevBtn).getElement(),
    public nextBtn: HTMLElement = new BaseComponent(paginationView.nextBtn).getElement(),
  ) {
    super(paginationView.wrapper);

    this.getElement().append(
      this.prevBtn,
      this.nextBtn,
    );
  }

  public setPage(): string {
    return `Page #${this.currentPage}`;
  }

  public disableBtns(): void {
    this.disableNextBtn();
    this.disablePrevBtn();
  }

  public enableBtns(): void {
    this.enableNextBtn();
    this.enablePrevBtn();
  }

  public disablePrevBtn(): void {
    this.prevBtn.setAttribute('disabled', '');
  }

  public disableNextBtn(): void {
    this.nextBtn.setAttribute('disabled', '');
  }

  public enablePrevBtn(): void {
    this.prevBtn.removeAttribute('disabled');
  }

  public enableNextBtn(): void {
    this.nextBtn.removeAttribute('disabled');
  }
}
