import { ParagraphTag } from '../ui-lib/dom/tags/paragraph';
import { ButtonTag } from '../ui-lib/dom/tags/button';
import { InputTag } from '../ui-lib/dom/tags/input';
import { PageContainer } from './shared';

export function example() {
	let outputField: ParagraphTag, firstNameInput: InputTag;

	new PageContainer()
		.populate([
			(outputField = new ParagraphTag({ text: 'What\'s your name?' })),
			(firstNameInput = new InputTag({ placeholder: 'Set name...' })),
			new ButtonTag({ text: 'Send' }).onClick(() => setName()),
		])
		.create();

	function setName() {
		outputField.text.set(`Hi, ${firstNameInput.value.get()}!`);
		firstNameInput.set({
			placeholder: 'Change name...',
			value: '',
		});
	}
}
