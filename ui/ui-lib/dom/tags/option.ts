import { Attribute } from '../attribute';
import { Tag, TagOptions } from '../tag';

export interface OptionTagOptions extends TagOptions {
	value?: string;
	selected?: boolean;
}

export class OptionTag extends Tag {
	override tag = 'option';

	public value = new Attribute({ name: 'value' });
	public selected = new Attribute<boolean>({ name: 'selected' });

	public constructor(options: OptionTagOptions = {}) {
		super();
		this.set(options);
	}

	override set(options: OptionTagOptions): this {
		return super.set(options);
	}
}
