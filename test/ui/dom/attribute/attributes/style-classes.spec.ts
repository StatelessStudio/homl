import { StyleClassesAttribute } from '../../../../../ui/ui-lib/dom/attribute/attributes/style-classes';

describe('StyleClassesAttribute', () => {
	let element: HTMLDivElement;

	beforeEach(() => {
		element = document.createElement('div');
	});

	it('should convert array to string', () => {
		const attr = new StyleClassesAttribute({
			name: 'classList',
			value: ['class1', 'class2'],
		});

		attr.create({ element });
		expect(element.classList.toString()).toBe('class1 class2');
	});

	it('should convert string to array', () => {
		const attr = new StyleClassesAttribute({
			name: 'classList',
			value: ['class1', 'class2'],
		});

		attr.create({ element });
		expect(attr.get()).toEqual(['class1', 'class2']);
	});

	it('should handle empty array', () => {
		const attr = new StyleClassesAttribute({
			name: 'classList',
			value: [],
		});
		attr.create({ element });
		expect(element.classList.toString()).toBe('');
	});

	it('should not allow string values', () => {
		const attr = new StyleClassesAttribute({
			name: 'classList',
			//@ts-expect-error - Confirm string values are not allowed
			value: '',
		});
	});

	it('should not allow null value', () => {
		const attr = new StyleClassesAttribute({
			name: 'classList',
			//@ts-expect-error - Confirm null values are not allowed
			value: null,
		});
	});

	it('can handle null value', () => {
		const attr = new StyleClassesAttribute({
			name: 'classList',
			value: <any>null,
		});

		attr.create({ element });

		expect(element.classList.toString()).toEqual('');
	});

	it('should handle undefined value', () => {
		const attr = new StyleClassesAttribute({
			name: 'classList',
			value: undefined,
		});
		attr.create({ element });
		expect(element.classList.toString()).toEqual('');
	});

	it('can get safely if not set', () => {
		const attr = new StyleClassesAttribute({
			name: 'classList',
		});

		attr.create({ element });

		expect(attr.get()).toEqual([]);
	});
});
