import '../../mock-dom';

import {
	applyStyle,
	convertStylingRuleName,
} from '../../../../ui/ui-lib/dom/style';

describe('applyStyle', () => {
	let insertRuleSpy: jasmine.Spy;

	beforeEach(() => {
		insertRuleSpy = spyOn(window.CSSStyleSheet.prototype, 'insertRule');
		insertRuleSpy.and.returnValue(0);
	});

	it('should apply style to a single HTMLElement', () => {
		const div = document.createElement('div');
		document.body.appendChild(div);

		applyStyle(div, { color: 'red', backgroundColor: 'blue' });

		expect(div.style.color).toBe('red');
		expect(div.style.backgroundColor).toBe('blue');
	});

	it('can apply style to input elements by tag name', () => {
		const input = document.createElement('input');
		document.body.appendChild(input);

		applyStyle('input', { color: 'green' });

		expect(insertRuleSpy).toHaveBeenCalledWith('input { color: green }');
	});

	it('should not throw an error if no elements are found', () => {
		expect(() => {
			applyStyle('.non-existent-class', { color: 'red' });
		}).not.toThrow();
	});
});

describe('convertStylingRuleName', () => {
	it('can convert camelCase to kebab-case', () => {
		expect(convertStylingRuleName('backgroundColor')).toBe(
			'background-color'
		);
		expect(convertStylingRuleName('fontSize')).toBe('font-size');
		expect(convertStylingRuleName('borderTopLeftRadius')).toBe(
			'border-top-left-radius'
		);
	});

	it('can handle strings with no uppercase letters', () => {
		expect(convertStylingRuleName('color')).toBe('color');
		expect(convertStylingRuleName('width')).toBe('width');
	});

	it('can handle empty strings', () => {
		expect(convertStylingRuleName('')).toBe('');
	});

	it('can handle strings with multiple uppercase letters', () => {
		expect(convertStylingRuleName('MozTransition')).toBe('-moz-transition');
		expect(convertStylingRuleName('WebkitTransform')).toBe(
			'-webkit-transform'
		);
	});
});
