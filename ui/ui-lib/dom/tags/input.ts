import { Tag } from '../tag';

export class InputTag extends Tag {
	public tag = 'input';

	public getValue(): string {
		return (this.element as HTMLInputElement).value;
	}
}
