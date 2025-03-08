import { OptionTag } from '../../../../ui/lib/tags/form/option';

describe('OptionTag', () => {
	it('should create an OptionTag with default values', () => {
		const optionTag = new OptionTag();
		expect(optionTag.tag).toBe('option');
		expect(optionTag.value.get()).toBeNull();
	});

	it('should set the value attribute', () => {
		const optionTag = new OptionTag({ value: 'test-value' });
		expect(optionTag.value.get()).toBe('test-value');
	});

	it('should override the value attribute', () => {
		const optionTag = new OptionTag();
		optionTag.value.set('new-value');
		expect(optionTag.value.get()).toBe('new-value');
	});

	it('should set options using the set method', () => {
		const optionTag = new OptionTag();
		optionTag.set({ value: 'another-value' });
		expect(optionTag.value.get()).toBe('another-value');
	});
});
