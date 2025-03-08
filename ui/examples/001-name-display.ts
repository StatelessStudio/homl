import { ParagraphTag } from '../lib/tags/text/paragraph';
import { ButtonTag, InputTag } from '../lib/tags/form';
import { PageContainer } from './shared';

export function example() {
	let outputField: ParagraphTag, firstNameInput: InputTag;

	const page = new PageContainer().populate([
		(outputField = new ParagraphTag({ text: 'What\'s your name?' })),
		(firstNameInput = new InputTag({ placeholder: 'Set name...' })),
		new ButtonTag({ text: 'Send' }).onClick(() => setName()),
	]);

	function setName() {
		outputField.text.set(`Hi, ${firstNameInput.value.get()}!`);
		firstNameInput.set({
			placeholder: 'Change name...',
			value: '',
		});
	}

	return page;
}
