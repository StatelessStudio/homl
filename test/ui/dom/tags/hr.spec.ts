import { HrTag } from '../../../../ui/ui-lib/dom/tags/hr';

describe('HrTag', () => {
	it('should create an hr element', () => {
		new HrTag().create();

		const element = document.querySelector('hr');

		expect(element?.tagName).toBe('HR');
	});
});
