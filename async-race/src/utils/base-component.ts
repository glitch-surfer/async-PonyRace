import type { IParams, IBaseComponent } from '../types/types';

export class BaseComponent implements IBaseComponent {
  private readonly element: HTMLElement;

  constructor(params: IParams) {
    this.element = document.createElement(params.tag);
    if (params.className !== undefined) this.setStyles(params.className);
    if (params.attributes !== undefined) this.setAttributes(params.attributes);
    if (params.text !== undefined) this.setText(params.text);
    if (params.children !== undefined) this.addChild(params.children);
    if (params.id !== undefined) this.setId(params.id);
  }

  private setStyles(className: string[]): void {
    this.element?.classList.add(...className);
  }

  private setAttributes(attributes: Record<string, string>): void {
    Object.entries(attributes).forEach(([key, value]) => {
      this.element.setAttribute(key, value);
    });
  }

  private setText(text: string): void {
    this.element.textContent = text;
  }

  private setId(id: string): void {
    this.element.setAttribute('id', id);
  }

  private addChild(children: IParams[]): void {
    children.forEach((child) => {
      const childElement = new BaseComponent(child).getElement();
      this.element.append(childElement);
    });
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
