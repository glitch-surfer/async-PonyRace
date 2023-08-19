import './styles/footer.scss';
import { BaseComponent } from '../../utils/base-component';
import { footerView } from './view/footer-view';

export class Footer extends BaseComponent {
  constructor() {
    super(footerView);
  }
}
