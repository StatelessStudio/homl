import { Tag } from '../tags';

export abstract class Component {
	protected tag: Tag;
	protected parent?: Tag | Component;

	protected abstract make(): Tag;

	protected init(): this {
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

	public setParent(parent: Tag | Component): this {
		this.parent = parent;

		return this;
	}

	public render(): this {
		this.tag.render();

		return this;
	}

	public remove(): this {
		this.tag.remove();

		return this;
	}
}
