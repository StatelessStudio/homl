import { PageContainer } from './shared';
import {
	ButtonTag,
	SelectTag,
	OptionGroupTag,
	OptionTag,
} from '../lib/tags/form';
import { HrTag } from '../lib/tags/layout';
import { ParagraphTag } from '../lib/tags/text/paragraph';

export function example() {
	const selectionDisplay = new ParagraphTag({ text: 'No selection' });

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

	carSelect.on('change', () => updateSelectionDisplay(carSelect.getValues()));

	const autoSelectButton = new ButtonTag({ text: 'One of Each' }).onClick(
		() => setValues(['f', 't', 'b'])
	);

	const resetButton = new ButtonTag({ text: 'Reset' }).onClick(() =>
		setValues([])
	);

	const page = new PageContainer().populate([
		carSelect,
		autoSelectButton,
		resetButton,
		selectionDisplay,
	]);

	function setValues(values: string[]) {
		carSelect.setValues(values);
		updateSelectionDisplay(values);
	}

	function updateSelectionDisplay(selected: (string | number)[]) {
		selectionDisplay.text.set(
			selected.length
				? 'Selected: ' + selected.join(', ')
				: 'No selection'
		);
	}

	return page;
}
