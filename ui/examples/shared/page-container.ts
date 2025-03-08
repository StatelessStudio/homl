import { StyleClassesAttribute } from '../../lib/attributes/style-classes';
import { px, Styling } from '../../lib/style';
import { DivTag } from '../../lib/tags/layout/div';

export class PageContainer extends DivTag {
	public override styleClasses = new StyleClassesAttribute({
		name: 'classList',
		value: ['page-container'],
	});
}
