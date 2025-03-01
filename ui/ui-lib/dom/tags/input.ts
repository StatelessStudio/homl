import { Attribute } from '../attribute';
import { Tag, TagOptions } from '../tag';

export interface InputTagOptions extends TagOptions {
	placeholder?: string;
	value?: string;
}

export class InputTag extends Tag {
	public tag = 'input';
	public placeholder = new Attribute({ name: 'placeholder' });
	public value = new Attribute({ name: 'value' });

	public constructor(options: InputTagOptions = {}) {
		super({});
		this.set(options);
	}

	public override set(options: InputTagOptions): this {
		return super.set(options);
	}
}
