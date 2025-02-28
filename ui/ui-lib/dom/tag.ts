import { Attribute } from './attribute';

export interface TagOptions {
	id?: string;
	text?: string;
	children?: Tag[];
	parent?: Tag;
}

export abstract class Tag {
	public id = new Attribute({ name: 'id' });
	public text = new Attribute({ name: 'innerText' });

	public element: HTMLElement;
	public parent?: Tag;

	protected abstract tag: string;
	protected children: Tag[] = [];

	protected eventListeners: { [key: string]: EventListener } = {};

	public constructor(options: TagOptions = {}) {
		this.set(options);
	}

	public set(options: TagOptions): this {
		for (const key in options) {
			const option = options[key as keyof TagOptions];
			const thisKey = key as keyof typeof this;

			if (key in this && this[thisKey] !== undefined) {
				const attribute = this[thisKey];

				if (this.isAttribute(attribute)) {
					attribute.set(option as string);
				}
				else {
					this.setLocalProperty(key as keyof typeof this, option);
				}
			}
		}

		return this;
	}

	protected isAttribute(attr: any): attr is Attribute {
		return attr instanceof Attribute;
	}

	protected setLocalProperty(key: keyof typeof this, value: any): void {
		this[key] = value;
	}

	public create(options: { parent?: Tag } = {}): this {
		this.parent = options.parent ?? this.parent;

		this.createElement();
		this.createAttributes();
		this.registerEventListeners();
		// TODO: This is currently called in render()
		//	v--- This should be uncommented once that's optimized
		//this.createChildren();
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

	protected createAttributes(): this {
		for (const key in this) {
			const attribute = this[key];

			if (this.isAttribute(attribute)) {
				attribute.create({ element: this.element });
			}
		}

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
		this.renderAttributes();

		return this;
	}

	protected renderAttributes(): this {
		for (const key in this) {
			const attribute = this[key];

			if (this.isAttribute(attribute)) {
				attribute.render();
			}
		}

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

	public on(action: string, fn: () => void): this {
		this.eventListeners[action] = fn.bind(this);

		return this;
	}

	public onClick(fn: () => void): this {
		return this.on('click', fn);
	}
}
