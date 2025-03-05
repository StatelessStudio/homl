import { SelectTag } from '../../../ui-lib/dom/tags/select';
import { OptionTag } from '../../../ui-lib/dom/tags/option';
import { allExamples } from './all-examples';

export const sidebar = new SelectTag({
	children: getSidebarOptions(),
});

function getSidebarOptions() {
	return Object.keys(allExamples).map((example) => {
		return new OptionTag({ value: example, text: example });
	});
}
