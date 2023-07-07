import type { IApp } from '../types/types';
import { headerView } from './header/config/header-view';
import { Header } from './header/header';
import './styles/base.scss';

export class App implements IApp {
  constructor(
    public header = new Header(headerView),
  ) { }

  public createView(): void {
    document.body.append(this.header.getElement());
  }
}
