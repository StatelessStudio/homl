import { Component } from '../../../ui-lib/dom/components';
import { Tag } from '../../../ui-lib/dom/tag';
import { DivTag } from '../../../ui-lib/dom/tags/div';
import { PageContainer } from '../page-container';
import { allExamples } from './all-examples';
import { sidebar } from './browser-sidebar';

export function browser() {
	let example: Tag | Component = new PageContainer({
		text: 'Please select an example',
	});

	const page = new DivTag({
		children: [sidebar, example],
		styleClasses: ['example-browser'],
	}).create();

	sidebar.on('change', () => {
		const value = sidebar.value.get();

		if (value) {
			example.remove();
			example = allExamples[value]();
			page.createChild(example);
		}
	});

	return page;
}
