import { Component } from '../../../lib/components';
import { Tag } from '../../../lib/tags';
import { DivTag } from '../../../lib/tags/layout/div';
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
