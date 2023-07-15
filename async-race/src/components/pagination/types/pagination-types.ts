import type { IBaseComponent, IParams } from '../../../types/types';

export interface IPaginationParams {
  wrapper: IParams
  prevBtn: IParams
  nextBtn: IParams
}

export interface IPagination extends IBaseComponent {
  currentPage: number
  prevBtn: HTMLElement
  nextBtn: HTMLElement
  setPage: () => string
  disableBtns: () => void
  enableBtns: () => void
  disablePrevBtn: () => void
  disableNextBtn: () => void
  enablePrevBtn: () => void
  enableNextBtn: () => void
}
