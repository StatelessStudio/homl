import { InputTag } from '../../../../ui/ui-lib/dom/tags/input';

describe('InputTag', () => {
	it('should create an input tag with default options', () => {
		new InputTag().create();
		const inputElement = document.querySelector('input');

		expect(inputElement).withContext('dom element').toBeTruthy();
		expect(inputElement?.placeholder).withContext('placeholder').toBe('');
		expect(inputElement?.value).withContext('value').toBe('');
	});

	it('should create an input tag with provided options', () => {
		const placeholder = 'Enter text';
		const value = 'test value';

		const input = new InputTag({ placeholder, value }).create();

		const inputElement = document.querySelector('input');
		expect(inputElement?.placeholder)
			.withContext('placeholder')
			.toBe(placeholder);
		expect(inputElement?.value).withContext('value').toBe(value);
	});
});
