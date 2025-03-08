import { Attribute } from '../../attributes';
import { TagOptions } from '../tag';
import { InputTag } from './input';

export interface SelectTagOptions extends TagOptions {
	value?: string;
	multiple?: boolean;
	size?: number;
}

export class SelectTag extends InputTag {
	override tag = 'select';

	public multiple = new Attribute<boolean>({ name: 'multiple' });
	public size = new Attribute<number>({ name: 'size' });

	protected values: Array<number | string> = [];

	constructor(options: SelectTagOptions = {}) {
		super({});
		this.set(options);
	}

	override set(options: SelectTagOptions) {
		return super.set(options);
	}

	public getValues() {
		return this.element ? this.getSelectedNodes() : this.values;
	}

	protected getSelectedNodes() {
		const result = [];
		const options = (this.element as HTMLSelectElement).options;

		for (let i = 0, iLen = options.length; i < iLen; i++) {
			const opt = options[i];

			if (opt.selected) {
				result.push(opt.value);
			}
		}

		return result;
	}

	public override render(): this {
		super.render();

		if (this.values.length) {
			this.renderSelectedNodes();
		}
		else {
			this.values = this.getSelectedNodes();
		}

		return this;
	}

	public setValues(values: Array<number | string>): this {
		this.values = values;
		this.renderSelectedNodes();

		return this;
	}

	protected renderSelectedNodes() {
		const options = (this.element as HTMLSelectElement)?.options ?? [];

		for (let i = 0, iLen = options.length; i < iLen; i++) {
			const opt = options[i];

			opt.selected = this.values.includes(opt.value);
		}

		return this;
	}
}
