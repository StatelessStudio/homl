import { InputTag } from '../../../../ui/lib/tags/form/input';

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

		new InputTag({ placeholder, value }).create();

		const inputElement = document.querySelector('input');
		expect(inputElement?.placeholder)
			.withContext('placeholder')
			.toBe(placeholder);
		expect(inputElement?.value).withContext('value').toBe(value);
	});
});
