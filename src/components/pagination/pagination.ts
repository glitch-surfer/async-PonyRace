import './styles/pagination.scss';
import { BaseComponent } from '../../utils/base-component';
import type { IPagination } from './types/pagination-types';
import { paginationView } from './view/pagination-view';
import { disableBtns, enableBtns } from '../../utils/handle-btns';

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
    disableBtns([this.prevBtn, this.nextBtn]);
  }

  public enableBtns(): void {
    enableBtns([this.prevBtn, this.nextBtn]);
  }
}
