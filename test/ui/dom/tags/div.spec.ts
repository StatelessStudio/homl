import { DivTag } from '../../../../ui/ui-lib/dom/tags/div';

describe('DivTag', () => {
	let divTag: DivTag;

	beforeEach(() => {
		divTag = new DivTag();
	});

	it('should have the correct tag name', () => {
		expect(divTag.tag).toBe('div');
	});
});
