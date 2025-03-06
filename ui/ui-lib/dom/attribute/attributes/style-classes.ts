import { Attribute } from '../attribute';

export class StyleClassesAttribute extends Attribute<string[]> {
	protected override toString(): string {
		return this.value!.join(' ');
	}

	protected override fromString(value: string) {
		return value?.length ? value.toString().split(' ') : [];
	}
}
