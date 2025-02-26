import { applet } from '../ui-lib/applet/applet';

import { DivTag } from '../ui-lib/dom/tags/div';
import { ParagraphTag } from '../ui-lib/dom/tags/paragraph';
import { ButtonTag } from '../ui-lib/dom/tags/button';
import { InputTag } from '../ui-lib/dom/tags/input';

applet(() => {
	let outputField: ParagraphTag, firstNameInput: InputTag;

	new DivTag()
		.populate([
			(outputField = new ParagraphTag({ text: 'What\'s your name?' })),
			(firstNameInput = new InputTag()),
			new ButtonTag({ text: 'Send' }).onClick(() => setName()),
		])
		.create();

	function setName() {
		outputField.setText(`Hi, ${firstNameInput.getValue()}!`).render();
	}
});
