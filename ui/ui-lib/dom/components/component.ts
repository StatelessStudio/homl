import { Tag } from '../tag';

export abstract class Component {
	public tag: Tag;
	public parent?: Tag | Component;

	public abstract make(): Tag;

	public init(): this {
		this.tag = this.make();

		return this;
	}

	public create(options: { parent?: Tag | Component } = {}): this {
		if (!this.tag) {
			this.init();
		}

		if (options.parent) {
			this.parent = options.parent;
		}

		const parent = options.parent ?? this.parent;
		const parentTag = parent instanceof Component ? parent.tag : parent;

		this.tag.create({ parent: parentTag });

		return this;
	}

	public render(): this {
		this.tag.render();

		return this;
	}

	public remove(): this {
		this.tag.element.remove();

		return this;
	}
}
