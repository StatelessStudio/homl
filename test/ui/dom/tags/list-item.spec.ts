import { ListItemTag } from '../../../../ui/ui-lib/dom/tags/list-item';

describe('ListItemTag', () => {
	let listItem: ListItemTag;

	beforeEach(() => {
		listItem = new ListItemTag();
	});

	it('should have the correct tag name', () => {
		expect(listItem.tag).toBe('li');
	});
});
