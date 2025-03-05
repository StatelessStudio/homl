import { Attribute } from './attribute';
import { Component } from './components/component';
import { Styling } from './style';
import { ElementStyling } from './style/element-styling';

export interface TagOptions {
	id?: string;
	text?: string;
	style?: Styling;
	children?: Array<Tag | Component>;
	parent?: Tag;
}

export abstract class Tag {
	public id = new Attribute({ name: 'id' });
	public style: ElementStyling = new ElementStyling();
	public text = new Attribute({ name: 'innerText' });

	protected element: HTMLElement;
	protected parent?: Tag;

	protected abstract tag: string;
	protected children: Array<Tag | Component> = [];

	protected eventListeners: { [key: string]: EventListener } = {};

	public constructor(options: TagOptions = {}) {
		this.style.merge(this.defaultStyling());
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
				else if (this.isStyling(attribute)) {
					attribute.merge(option as Styling);
				}
				else {
					this.setLocalProperty(key as keyof typeof this, option);
				}
			}
		}

		return this;
	}

	protected defaultStyling(): Styling {
		return {};
	}

	protected isAttribute(attr: any): attr is Attribute {
		return attr instanceof Attribute;
	}

	protected isStyling(attr: any): attr is ElementStyling {
		return attr instanceof ElementStyling;
	}

	protected setLocalProperty(key: keyof typeof this, value: any): void {
		this[key] = value;
	}

	public create(options: { parent?: Tag } = {}): this {
		this.parent = options.parent ?? this.parent;

		this.createElement();
		this.createAttributes();
		this.createStyle();
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

	protected createAttributes(): this {
		for (const key in this) {
			const attribute = this[key];

			if (this.isAttribute(attribute)) {
				attribute.create({ element: this.element });
			}
		}

		return this;
	}

	protected createStyle(): this {
		this.style.create(this.element);

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
		this.renderAttributes();
		this.renderStyle();

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

	protected renderStyle(): this {
		this.style.render();

		return this;
	}

	public renderChildren(): this {
		for (const child of this.children) {
			child.render();
		}

		return this;
	}

	public populate(children: Array<Tag | Component>): this {
		this.children = children;

		return this;
	}

	public appendChild(child: Tag | Component): this {
		child.setParent(this);
		this.children.push(child);

		return this;
	}

	public createChild(child: Tag | Component): this {
		this.appendChild(child.create({ parent: this }));

		return this;
	}

	public setParent(parent: Tag): this {
		this.parent = parent;

		return this;
	}

	public remove(): this {
		this.element.remove();

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
