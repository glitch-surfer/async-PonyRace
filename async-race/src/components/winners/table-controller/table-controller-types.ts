export interface ITableController {
  currentSort: 'wins' | 'time'
  currentOrder: 'ASC' | 'DESC'
  sortByWinsCount: (event: MouseEvent) => void
  sortByBestTime: (event: MouseEvent) => void
}
