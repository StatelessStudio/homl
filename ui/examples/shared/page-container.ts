import { px, Styling } from '../../ui-lib/dom/style';
import { DivTag } from '../../ui-lib/dom/tags/div';

export class PageContainer extends DivTag {
	public override defaultStyling(): Styling {
		return {
			...super.defaultStyling(),
			margin: 'auto',
			maxWidth: px(800),
			padding: '20px',
		};
	}
}
