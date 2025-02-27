export interface TagOptions {
	children?: Tag[];
	text?: string;
}

export abstract class Tag {
	public text?: string;

	protected abstract tag: string;
	protected children: Tag[] = [];

	protected element: HTMLElement;
	protected eventListeners: { [key: string]: EventListener } = {};

	public constructor(options: TagOptions = {}) {
		this.children = options.children ?? this.children;
		this.text = options.text ?? this.text;
	}

	public create(): this {
		this.createElement();
		this.registerEventListeners();
		this.createChildren();
		this.render();

		return this;
	}

	protected createChildren(): this {
		for (const child of this.children) {
			child.create();
		}

		return this;
	}

	protected createElement(): this {
		this.element = document.createElement(this.tag);
		document.body.appendChild(this.element);

		return this;
	}

	protected registerEventListeners(): this {
		for (const ev in this.eventListeners) {
			this.element.addEventListener(ev, this.eventListeners[ev]);
		}

		return this;
	}

	public render(): this {
		this.renderElement();
		this.renderChildren();

		return this;
	}

	protected renderElement(): this {
		this.element.innerHTML = this.text || '';

		return this;
	}

	public renderChildren(): this {
		for (const child of this.children) {
			child.render();
		}

		return this;
	}

	public populate(children: Tag[]): this {
		this.children = children;

		return this;
	}

	public setText(text: string): this {
		this.text = text;

		return this;
	}

	public getText(): string {
		return this.text || '';
	}

	public on(action: string, fn: () => void): this {
		this.eventListeners[action] = fn.bind(this);

		return this;
	}

	public onClick(fn: () => void): this {
		return this.on('click', fn);
	}
}
