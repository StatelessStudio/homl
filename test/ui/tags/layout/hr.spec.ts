import { HrTag } from '../../../../ui/lib/tags/layout/hr';

describe('HrTag', () => {
	it('should create an hr element', () => {
		new HrTag().create();

		const element = document.querySelector('hr');

		expect(element?.tagName).toBe('HR');
	});
});
