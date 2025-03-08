import 'jasmine';
import { ButtonTag } from '../../../../ui/lib/tags/form/button';

describe('ButtonTag', function () {
	let buttonTag: ButtonTag;

	beforeEach(() => {
		buttonTag = new ButtonTag();
	});

	it('should have tag property set to "button"', function () {
		expect(buttonTag.tag).toBe('button');
	});
});
