import { Attribute } from '../attribute';
import { Tag, TagOptions } from '../tag';
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

	constructor(options: SelectTagOptions = {}) {
		super({});
		this.set(options);
	}

	override set(options: SelectTagOptions) {
		return super.set(options);
	}

	public getValues() {
		const result = [];
		const options = (this.element as HTMLSelectElement)?.options ?? [];

		for (let i = 0, iLen = options.length; i < iLen; i++) {
			const opt = options[i];

			if (opt.selected) {
				result.push(opt.value ?? opt.text);
			}
		}

		return result;
	}

	public setValues(values: Array<number | string>) {
		const options = (this.element as HTMLSelectElement)?.options ?? [];

		for (let i = 0, iLen = options.length; i < iLen; i++) {
			const opt = options[i];

			opt.selected = values.includes(opt.value ?? opt.text);
		}
	}
}
