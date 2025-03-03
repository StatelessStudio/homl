import '../../mock-dom';

import { ElementStyling } from '../../../../ui/ui-lib/dom/style/element-styling';

describe('ElementStyling', () => {
	let elementStyling: ElementStyling;
	let mockElement: HTMLElement;

	beforeEach(() => {
		elementStyling = new ElementStyling();
		mockElement = document.createElement('div');
	});

	it('should initialize with empty styling', () => {
		expect(elementStyling.styling).toEqual({});
	});

	it('should set styling options', () => {
		const options = { color: 'red', fontSize: '16px' };
		elementStyling.set(options);
		expect(elementStyling.styling).toEqual(options);
	});

	it('should set the element', () => {
		elementStyling.create(mockElement);
		expect(elementStyling['element']).toBe(mockElement);
	});

	it('should merge styling options', () => {
		const initialOptions = { color: 'red' };
		const newOptions = { fontSize: '16px' };
		elementStyling.set(initialOptions);
		elementStyling.merge(newOptions);
		expect(elementStyling.styling).toEqual({
			color: 'red',
			fontSize: '16px',
		});
	});

	it('should apply styles to the element', () => {
		const options = { color: 'red', fontSize: '16px' };
		elementStyling.create(mockElement);
		elementStyling.set(options);
		expect(mockElement.style.color).toBe('red');
		expect(mockElement.style.fontSize).toBe('16px');
	});

	it('should not apply styles if element is not set', () => {
		const options = { color: 'red', fontSize: '16px' };
		elementStyling.set(options);
		expect(mockElement.style.color).toBe('');
		expect(mockElement.style.fontSize).toBe('');
	});
});
