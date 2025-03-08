import { StyleClassesAttribute } from '../../ui-lib/dom/attribute/attributes/style-classes';
import { px, Styling } from '../../ui-lib/dom/style';
import { DivTag } from '../../ui-lib/dom/tags/div';

export class PageContainer extends DivTag {
	public override styleClasses = new StyleClassesAttribute({
		name: 'classList',
		value: ['page-container'],
	});
}
