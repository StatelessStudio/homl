import { SelectTag, OptionTag } from '../../../lib/tags/form';
import { allExamples } from './all-examples';

export const sidebar = new SelectTag({
	children: getSidebarOptions(),
	styleClasses: ['sidebar', 'inverted-colors'],
	size: 2,
});

function getSidebarOptions() {
	return Object.keys(allExamples).map((example) => {
		return new OptionTag({ value: example, text: example });
	});
}
