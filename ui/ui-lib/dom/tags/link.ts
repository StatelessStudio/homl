import { Attribute } from '../attribute';
import { Tag, TagOptions } from '../tag';

export interface LinkTagOptions extends TagOptions {
	href?: string;
	target?: string;
	rel?: string;
}

export class LinkTag extends Tag {
	protected tag = 'a';

	public href = new Attribute({ name: 'href' });
	public target = new Attribute({ name: 'target' });
	public rel = new Attribute({ name: 'rel' });

	public constructor(options: LinkTagOptions = {}) {
		super({});
		this.set(options);
	}

	public override set(options: LinkTagOptions): this {
		return super.set(options);
	}
}
