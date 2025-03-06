import { SelectTag } from '../ui-lib/dom/tags/select';
import { PageContainer } from './shared';
import { OptionTag } from '../ui-lib/dom/tags/option';
import { OptionGroupTag } from '../ui-lib/dom/tags/option-group';
import { ButtonTag } from '../ui-lib/dom/tags/button';
import { HrTag } from '../ui-lib/dom/tags/hr';

export function example() {
	const carSelect = new SelectTag({
		style: { height: '300px', width: '400px' },
		children: [
			new OptionGroupTag({
				label: 'American',
				children: [
					new OptionTag({ value: 'f', text: 'Ford' }),
					new OptionTag({ value: 'c', text: 'Chevrolet' }),
				],
			}),
			new HrTag(),
			new OptionGroupTag({
				label: 'Japanese',
				children: [
					new OptionTag({ value: 't', text: 'Toyota' }),
					new OptionTag({ value: 'h', text: 'Honda' }),
				],
			}),
			new HrTag(),
			new OptionGroupTag({
				label: 'German',
				children: [
					new OptionTag({ value: 'b', text: 'BMW' }),
					new OptionTag({ value: 'm', text: 'Mercedes' }),
				],
			}),
		],
		value: '3',
		multiple: true,
	});

	carSelect.on('change', () => {
		console.log('Selected value:', carSelect.getValues());
	});

	const autoSelectButton = new ButtonTag({ text: 'One of Each' }).onClick(
		() => carSelect.setValues(['f', 't', 'b'])
	);

	const resetButton = new ButtonTag({ text: 'Reset' }).onClick(() =>
		carSelect.setValues([])
	);

	return new PageContainer().populate([
		carSelect,
		autoSelectButton,
		resetButton,
	]);
}
