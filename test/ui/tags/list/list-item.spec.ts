import { ListItemTag } from '../../../../ui/lib/tags/list/list-item';

describe('ListItemTag', () => {
	let listItem: ListItemTag;

	beforeEach(() => {
		listItem = new ListItemTag();
	});

	it('should have the correct tag name', () => {
		expect(listItem.tag).toBe('li');
	});
});
