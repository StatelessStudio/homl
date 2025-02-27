export interface TagOptions {
	children?: Tag[];
	text?: string;
	parent?: Tag;
}

export abstract class Tag {
	public text?: string;
	public element: HTMLElement;
	public parent?: Tag;

	protected abstract tag: string;
	protected children: Tag[] = [];

	protected eventListeners: { [key: string]: EventListener } = {};

	public constructor(options: TagOptions = {}) {
		this.children = options.children ?? this.children;
		this.text = options.text ?? this.text;
		this.parent = options.parent ?? this.parent;
	}

	public create(options: { parent?: Tag } = {}): this {
		this.parent = options.parent ?? this.parent;

		this.createElement();
		this.registerEventListeners();
		this.createChildren();
		this.render();

		return this;
	}

	protected createChildren(): this {
		for (const child of this.children) {
			child.create({ parent: this });
		}

		return this;
	}

	protected createElement(): this {
		const parentElement = this.parent?.element ?? document.body;
		const elementFrag = document.createElement(this.tag);
		this.element = parentElement.appendChild(elementFrag);

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
		// TODO: Optimize this to only re-create the children that have changed
		//
		// The line prior wipes out the children, so we need to re-create them
		// 	here
		this.createChildren();
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
