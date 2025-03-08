import { ButtonTag, InputTag } from '../lib/tags/form';
import { ListItemTag, UnorderedListTag } from '../lib/tags/list';
import { LinkTag } from '../lib/tags/nav';
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
