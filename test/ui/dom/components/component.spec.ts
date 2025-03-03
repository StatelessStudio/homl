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

	it('can create a component with multiple child components', () => {
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

		new TestComponent('Parameterized Component').create();

		const element = document.querySelector('div');
		expect(element).withContext('div element').toBeTruthy();
		expect(element?.innerText)
			.withContext('text content')
			.toBe('Parameterized Component');
	});

	it('can have nested components and tags', () => {
		class ChildComponent extends Component {
			public make() {
				return new DivTag({ id: 'child' }).populate([
					new DivTag({ id: 'grandchild1' }),
					new DivTag({ id: 'grandchild2' }),
				]);
			}
		}

		class ParentComponent extends Component {
			public make() {
				return new DivTag({ id: 'parent1' }).populate([
					new DivTag({ id: 'parent2' }).populate([
						new ChildComponent(),
					]),
				]);
			}
		}

		new ParentComponent().init().create();

		const parent1Element = document.querySelector('div');
		expect(parent1Element).withContext('parent1 element').toBeTruthy();
		expect(parent1Element?.id).withContext('parent1 id').toBe('parent1');

		const parent2Element = parent1Element?.children[0] as HTMLElement;
		expect(parent2Element).withContext('parent2 element').toBeTruthy();
		expect(parent2Element?.id).withContext('parent2 id').toBe('parent2');

		const childElement = parent2Element?.children[0] as HTMLElement;
		expect(childElement).withContext('child element').toBeTruthy();
		expect(childElement?.id).withContext('child id').toBe('child');

		const grandchild1Element = childElement?.children[0] as HTMLElement;
		expect(grandchild1Element)
			.withContext('grandchild1 element')
			.toBeTruthy();
		expect(grandchild1Element?.id)
			.withContext('grandchild1 id')
			.toBe('grandchild1');

		const grandchild2Element = childElement?.children[1] as HTMLElement;
		expect(grandchild2Element)
			.withContext('grandchild2 element')
			.toBeTruthy();
		expect(grandchild2Element?.id)
			.withContext('grandchild2 id')
			.toBe('grandchild2');
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
