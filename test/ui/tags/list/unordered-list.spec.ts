import { UnorderedListTag } from '../../../../ui/lib/tags/list/unordered-list';

describe('UnorderedListTag', () => {
	let unorderedList: UnorderedListTag;

	beforeEach(() => {
		unorderedList = new UnorderedListTag();
	});

	it('should have the correct tag name', () => {
		expect(unorderedList.tag).toBe('ul');
	});
});
