import { Attribute } from '../../attributes';
import { Tag, TagOptions } from '../tag';

export interface OptionGroupTagOptions extends TagOptions {
	label?: string;
}

export class OptionGroupTag extends Tag {
	override tag = 'optgroup';

	public label = new Attribute({ name: 'label' });

	public constructor(options: OptionGroupTagOptions = {}) {
		super({});
		this.set(options);
	}

	override set(options: OptionGroupTagOptions): this {
		return super.set(options);
	}
}
