import { applyStyleToElement, Styling } from '.';

export class ElementStyling {
	public styling: Styling = {};
	protected element?: HTMLElement;

	constructor(options: Styling = {}) {
		this.set(options);
	}

	public set(options: Styling): this {
		for (const key in options) {
			this.styling[key] = <any>options[key];
		}

		this.render();

		return this;
	}

	public setElement(element: HTMLElement): this {
		this.element = element;

		return this;
	}

	public merge(style: Styling): this {
		this.styling = { ...this.styling, ...style };

		this.render();

		return this;
	}

	public render(): this {
		if (this.element) {
			applyStyleToElement(this.element, this.styling);
		}

		return this;
	}
}
