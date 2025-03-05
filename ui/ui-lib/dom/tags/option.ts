import { Attribute } from '../attribute';
import { Tag, TagOptions } from '../tag';

export interface OptionTagOptions extends TagOptions {
	value?: string;
}

export class OptionTag extends Tag {
	override tag = 'option';

	public value = new Attribute({ name: 'value' });

	public constructor(options: OptionTagOptions = {}) {
		super();
		this.set(options);
	}

	override set(options: OptionTagOptions): this {
		return super.set(options);
	}
}
