import { SelectTag } from '../ui-lib/dom/tags/select';
import { Component } from '../ui-lib/dom/components';
import { PageContainer } from './shared';
import { OptionTag } from '../ui-lib/dom/tags/option';

export function example() {
	const carSelect = new SelectTag({
		children: [
			new OptionTag({ value: '1', text: 'Ford' }),
			new OptionTag({ value: '2', text: 'Honda' }),
			new OptionTag({ value: '3', text: 'Toyota' }),
		],
		value: '3',
	});

	carSelect.on('change', () => {
		console.log('Selected value:', carSelect.value.get());
	});

	return new PageContainer().populate([carSelect]);
}
