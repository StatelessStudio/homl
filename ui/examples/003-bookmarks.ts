import { applet } from '../ui-lib/applet/applet';

import { DivTag } from '../ui-lib/dom/tags/div';
import { ButtonTag } from '../ui-lib/dom/tags/button';
import { InputTag } from '../ui-lib/dom/tags/input';
import { UnorderedListTag } from '../ui-lib/dom/tags/unordered-list';
import { ListItemTag } from '../ui-lib/dom/tags/list-item';
import { LinkTag } from '../ui-lib/dom/tags/link';

applet(() => {
	let list: UnorderedListTag, nameInput: InputTag, urlInput: InputTag;

	new DivTag()
		.populate([
			(nameInput = new InputTag({ placeholder: 'Name' })),
			(urlInput = new InputTag({ placeholder: 'URL' })),
			new ButtonTag({ text: 'Save' }).onClick(() => addBookmark()),
			(list = new UnorderedListTag()),
		])
		.create();

	function addBookmark() {
		const url = urlInput.value.get();

		if (url) {
			const listItem = new ListItemTag().populate([
				new LinkTag({
					href: url,
					text: nameInput.value.get(),
					//target: '_blank',
				}),
			]);
			list.createChild(listItem);
			nameInput.value.set('');
			urlInput.value.set('');
		}
	}
});
