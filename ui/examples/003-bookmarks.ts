import { ButtonTag } from '../ui-lib/dom/tags/button';
import { InputTag } from '../ui-lib/dom/tags/input';
import { UnorderedListTag } from '../ui-lib/dom/tags/unordered-list';
import { ListItemTag } from '../ui-lib/dom/tags/list-item';
import { LinkTag } from '../ui-lib/dom/tags/link';
import { PageContainer } from './shared';

export function example() {
	let list: UnorderedListTag, nameInput: InputTag, urlInput: InputTag;

	const page = new PageContainer().populate([
		(nameInput = new InputTag({ placeholder: 'Name' })),
		(urlInput = new InputTag({
			placeholder: 'URL',
			value: 'https://google.com',
		})),
		new ButtonTag({ text: 'Save' }).onClick(() => addBookmark()),
		(list = new UnorderedListTag()),
	]);

	function addBookmark() {
		const name = nameInput.value.get();
		const url = urlInput.value.get();

		if (name && url) {
			list.createChild(
				new ListItemTag().populate([
					new LinkTag({
						href: url,
						text: name,
						target: '_blank',
					}),
				])
			);

			nameInput.value.set('');
			urlInput.value.set('');
		}
	}

	return page;
}
