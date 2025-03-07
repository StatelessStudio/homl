import { SelectTag } from '../ui-lib/dom/tags/select';
import { PageContainer } from './shared';
import { OptionTag } from '../ui-lib/dom/tags/option';
import { ParagraphTag } from '../ui-lib/dom/tags/paragraph';

export function example() {
	const carSelect = new SelectTag({
		children: [
			new OptionTag({ value: '1', text: 'Ford' }),
			new OptionTag({ value: '2', text: 'Honda' }),
			new OptionTag({ value: '3', text: 'Toyota' }),
		],
		value: '3',
	});

	const output = new ParagraphTag({ text: 'No selection' });

	carSelect.on('change', () => {
		output.set({ text: `Selected: ${carSelect.value.get()}` });
	});

	return new PageContainer().populate([carSelect, output]);
}
