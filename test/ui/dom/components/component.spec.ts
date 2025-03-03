import { Component } from '../../../../ui/ui-lib/dom/components';
import { DivTag } from '../../../../ui/ui-lib/dom/tags/div';

describe('Component', () => {
	it('can create a component with a div tag', () => {
		class TestComponent extends Component {
			public make() {
				return new DivTag({ text: 'Basic Component' });
			}
		}

		new TestComponent().init().create();

		const divElement = document.querySelector('div');
		expect(divElement).withContext('div element').toBeTruthy();
		expect(divElement?.innerText)
			.withContext('text content')
			.toBe('Basic Component');
	});

	it('can create a component with a div tag and a child component', () => {
		class ChildComponent extends Component {
			public make() {
				return new DivTag({ text: 'Child Component' });
			}
		}

		class ParentComponent extends Component {
			public make() {
				return new DivTag().populate([new ChildComponent()]);
			}
		}

		new ParentComponent().init().create();

		const divElement = document.querySelector('div');
		expect(divElement).withContext('div element').toBeTruthy();
		expect(divElement?.children.length).withContext('child count').toBe(1);
		expect((divElement?.children[0] as HTMLElement).innerText)
			.withContext('child text content')
			.toBe('Child Component');
	});

	it('can create a component with a div tag and multiple child components', () => {
		class ChildComponent extends Component {
			public make() {
				return new DivTag({ text: 'Child Component' });
			}
		}

		class ParentComponent extends Component {
			public make() {
				return new DivTag().populate([
					new ChildComponent(),
					new ChildComponent(),
				]);
			}
		}

		new ParentComponent().init().create();

		const divElement = document.querySelector('div');
		expect(divElement).withContext('div element').toBeTruthy();
		expect(divElement?.children.length).withContext('child count').toBe(2);
		expect((divElement?.children[0] as HTMLElement).innerText)
			.withContext('child text content')
			.toBe('Child Component');
		expect((divElement?.children[1] as HTMLElement).innerText)
			.withContext('child text content')
			.toBe('Child Component');
	});

	it('can create a component with a subcomponent', () => {
		class ChildComponent extends Component {
			public make() {
				return new DivTag({ text: 'Child Component' });
			}
		}

		class ParentComponent extends Component {
			public make() {
				return new DivTag();
			}
		}

		const parent = new ParentComponent().init().create();
		const child = new ChildComponent().init().create({ parent });

		const parentElement = document.querySelector('div');
		expect(parentElement).withContext('div element').toBeTruthy();

		const childElement = parentElement?.children[0] as HTMLElement;
		expect(childElement).withContext('child element').toBeTruthy();
		expect(childElement?.innerText)
			.withContext('text content')
			.toBe('Child Component');
	});

	it('can accept parameters', () => {
		class TestComponent extends Component {
			constructor(public text: string) {
				super();
			}

			public make() {
				return new DivTag({ text: this.text });
			}
		}

		new TestComponent('Parameterized Component').init().create();

		const divElement = document.querySelector('div');
		expect(divElement).withContext('div element').toBeTruthy();
		expect(divElement?.innerText)
			.withContext('text content')
			.toBe('Parameterized Component');
	});

	it('can remove a component', () => {
		class TestComponent extends Component {
			public make() {
				return new DivTag({ text: 'Removable Component' });
			}
		}

		const component = new TestComponent().init().create();
		component.remove();

		const divElement = document.querySelector('div');
		expect(divElement).withContext('div element').toBeNull();
	});

	it('can remove a child component', () => {
		class ChildComponent extends Component {
			public make() {
				return new DivTag({ text: 'Child Component' });
			}
		}

		class ParentComponent extends Component {
			public make() {
				return new DivTag().populate([new ChildComponent()]);
			}
		}

		const parentComponent = new ParentComponent().init().create();
		const childComponent = parentComponent.tag['children'][0] as Component;
		childComponent.remove();

		const divElement = document.querySelector('div');
		expect(divElement).withContext('div element').toBeTruthy();
		expect(divElement?.children.length).withContext('child count').toBe(0);
	});
});
