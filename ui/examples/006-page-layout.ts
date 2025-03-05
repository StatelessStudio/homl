import { UnorderedListTag } from '../ui-lib/dom/tags/unordered-list';
import { Component } from '../ui-lib/dom/components';
import { DivTag } from '../ui-lib/dom/tags/div';
import { ListItemTag } from '../ui-lib/dom/tags/list-item';
import { PageContainer } from './shared';

export class PageLayout extends Component {
	make() {
		return new DivTag().populate([
			new Header(),
			new DivTag({ style: { display: 'flex' } }).populate([
				new Sidebar(),
				new MainContent(),
			]),
			new Footer(),
		]);
	}
}

export class Header extends Component {
	make() {
		return new DivTag().populate([new PageContainer({ text: 'Header' })]);
	}
}

export class Sidebar extends Component {
	make() {
		return new UnorderedListTag().populate([
			new ListItemTag({ text: 'Home' }),
			new ListItemTag({ text: 'About' }),
			new ListItemTag({ text: 'Contact' }),
		]);
	}
}

export class MainContent extends Component {
	make() {
		return new PageContainer().populate([
			new DivTag({ text: 'Main Content' }),
		]);
	}
}

export class Footer extends Component {
	make() {
		return new PageContainer().populate([new DivTag({ text: 'Footer' })]);
	}
}

export function example() {
	return new PageLayout();
}
