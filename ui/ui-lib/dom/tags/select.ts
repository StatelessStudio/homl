import { Attribute } from '../attribute';
import { Tag, TagOptions } from '../tag';
import { InputTag } from './input';

export interface SelectTagOptions extends TagOptions {
	value?: string;
	multiple?: boolean;
}

export class SelectTag extends InputTag {
	override tag = 'select';

	public multiple = new Attribute<boolean>({ name: 'multiple' });

	constructor(options: SelectTagOptions = {}) {
		super({});
		this.set(options);
	}

	override set(options: SelectTagOptions) {
		return super.set(options);
	}
}
