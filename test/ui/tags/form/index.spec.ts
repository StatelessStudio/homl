import '../../mock-dom';

import {
	ButtonTag,
	InputTag,
	OptionGroupTag,
	OptionTag,
	SelectTag,
} from '../../../../ui/lib/tags/form';

// tbh, this is mainly just to satisfy the test coverage

describe('Form Index', () => {
	it('exports a ButtonTag', () => {
		expect(ButtonTag).toBeDefined();
	});

	it('exports an InputTag', () => {
		expect(InputTag).toBeDefined();
	});

	it('exports an OptionGroupTag', () => {
		expect(OptionGroupTag).toBeDefined();
	});

	it('exports an OptionTag', () => {
		expect(OptionTag).toBeDefined();
	});

	it('exports a SelectTag', () => {
		expect(SelectTag).toBeDefined();
	});
});
