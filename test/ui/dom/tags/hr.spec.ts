import { HrTag } from '../../../../ui/ui-lib/dom/tags/hr';

describe('HrTag', () => {
	it('should create an hr element', () => {
		const hrTag = new HrTag().create();

		const element = document.querySelector('hr');

		expect(element?.tagName).toBe('HR');
	});
});
