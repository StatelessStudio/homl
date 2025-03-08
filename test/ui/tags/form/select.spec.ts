import '../../mock-dom';

import { SelectTag, OptionTag } from '../../../../ui/lib/tags/form';

describe('SelectTag', () => {
	it('should create a SelectTag with default values', () => {
		new SelectTag().create();

		const selectElement = document.querySelector('select');
		expect(selectElement).toBeTruthy();
		expect(selectElement?.tagName).toBe('SELECT');
		expect(selectElement?.multiple).toBeFalsy();
	});

	it('should set the multiple attribute', () => {
		new SelectTag({ multiple: true }).create();

		const selectElement = document.querySelector('select');
		expect(selectElement?.multiple).toBeTruthy();
	});

	it('should override the multiple attribute', () => {
		const selectTag = new SelectTag().create();
		selectTag.multiple.set(true);

		const selectElement = document.querySelector('select');
		expect(selectElement?.multiple).toBeTruthy();
	});

	it('should set options using the set method', () => {
		const selectTag = new SelectTag().create();
		selectTag.set({ multiple: true });

		const selectElement = document.querySelector('select');
		expect(selectElement?.multiple).toBeTruthy();
	});

	it('can have options', () => {
		new SelectTag({
			children: [
				new OptionTag({ value: '1', text: 'One' }),
				new OptionTag({ value: '2', text: 'Two' }),
			],
		}).create();

		const selectElement = document.querySelector('select');
		expect(selectElement).toBeTruthy();
		expect(selectElement?.children.length).toBe(2);

		const childElement = selectElement?.children[0] as HTMLOptionElement;
		expect(childElement.tagName).toBe('OPTION');
		expect(childElement['innerText']).toBe('One');
		expect(childElement.getAttribute('value')).toBe('1');
	});

	it('can add options', () => {
		const selectTag = new SelectTag().create();
		selectTag.createChild(new OptionTag({ value: '1', text: 'One' }));

		const selectElement = document.querySelector('select');
		expect(selectElement).toBeTruthy();
		expect(selectElement?.children.length).toBe(1);

		const childElement = selectElement?.children[0] as HTMLOptionElement;
		expect(childElement.tagName).toBe('OPTION');
		expect(childElement['innerText']).toBe('One');
		expect(childElement.getAttribute('value')).toBe('1');
	});

	it('can remove options', () => {
		let option1: OptionTag;

		new SelectTag({
			children: [
				(option1 = new OptionTag({ value: '1', text: 'One' })),
				new OptionTag({ value: '2', text: 'Two' }),
			],
		}).create();

		const selectElement = document.querySelector('select');
		expect(selectElement).toBeTruthy();
		expect(selectElement?.children.length).toBe(2);

		option1.remove();

		expect(selectElement?.children.length).toBe(1);

		const child = selectElement?.children[0] as HTMLOptionElement;
		expect(child.innerText).toBe('Two');
	});

	it('should get selected values', () => {
		const selectTag = new SelectTag({
			multiple: true,
			children: [
				new OptionTag({ value: '1', text: 'One' }),
				new OptionTag({ value: '2', text: 'Two', selected: true }),
				new OptionTag({ value: '3', text: 'Three', selected: true }),
			],
		}).create();

		const values = selectTag.getValues();
		expect(values).toEqual(['2', '3']);
	});

	it('can safely get selected values before create', () => {
		const selectTag = new SelectTag({
			multiple: true,
			children: [new OptionTag({ value: '1', text: 'One' })],
		});

		const values = selectTag.getValues();
		expect(values).toEqual([]);
	});

	it('should return an empty array if no options are selected', () => {
		const selectTag = new SelectTag({
			multiple: true,
			children: [
				new OptionTag({ value: '1', text: 'One' }),
				new OptionTag({ value: '2', text: 'Two' }),
				new OptionTag({ value: '3', text: 'Three' }),
			],
		}).create();

		const values = selectTag.getValues();
		expect(values).toEqual([]);
	});

	it('should set selected values', () => {
		const selectTag = new SelectTag({
			multiple: true,
			children: [
				new OptionTag({ value: '1', text: 'One' }),
				new OptionTag({ value: '2', text: 'Two' }),
				new OptionTag({ value: '3', text: 'Three' }),
			],
		}).create();

		selectTag.setValues(['1', '3']);

		const values = selectTag.getValues();
		expect(values).toEqual(['1', '3']);
	});

	it('can safely set selected values before create', () => {
		const selectTag = new SelectTag({
			multiple: true,
			children: [new OptionTag({ value: '1', text: 'One' })],
		});

		selectTag.setValues(['1']).create();

		const element = document.querySelector('select') as HTMLSelectElement;
		expect(element).toBeTruthy();

		const child = element.children[0] as HTMLOptionElement;
		expect(child?.selected).toBe(true);
	});

	it('should deselect all options if empty array is passed', () => {
		const selectTag = new SelectTag({
			multiple: true,
			children: [
				new OptionTag({ value: '1', text: 'One', selected: true }),
				new OptionTag({ value: '2', text: 'Two', selected: true }),
				new OptionTag({ value: '3', text: 'Three', selected: true }),
			],
		}).create();

		selectTag.setValues([]);

		const values = selectTag.getValues();
		expect(values).toEqual([]);
	});

	it('should handle non-existent values gracefully', () => {
		const selectTag = new SelectTag({
			multiple: true,
			children: [
				new OptionTag({ value: '1', text: 'One' }),
				new OptionTag({ value: '2', text: 'Two' }),
			],
		}).create();

		selectTag.setValues(['1', '3']);

		const values = selectTag.getValues();
		expect(values).toEqual(['1']);
	});

	it('should set the size attribute', () => {
		new SelectTag({ size: 5 }).create();

		const selectElement = document.querySelector('select');
		expect(selectElement).toBeTruthy();
		expect(selectElement?.size).toBe(5);
	});

	it('should override the size attribute', () => {
		const selectTag = new SelectTag().create();
		selectTag.size.set(10);

		const selectElement = document.querySelector('select');
		expect(selectElement?.size).toBe(10);
	});
});
