import 'jasmine';
import '../mock-dom';
import { Tag } from '../../../ui/ui-lib/dom/tag';
import { Styling } from '../../../ui/ui-lib/dom/style';

class TestTag extends Tag {
	protected tag = 'div';
}

describe('Tag', () => {
	let tag: TestTag;

	beforeEach(() => {
		tag = new TestTag();
	});

	it('should create an element and append it to the document body', () => {
		tag.create();
		expect(document.body.contains(tag['element'])).toBeTrue();
	});

	it('can set the text content of the element in the constructor', () => {
		const text = 'Hello, World!';
		tag = new TestTag({ text }).create();

		const element = document.getElementsByTagName('div')[0];
		expect(element.innerText).toBe(text);
	});

	it('can set the text content of the element', () => {
		const text = 'Hello, World!';
		tag.create();

		tag.text.set(text);

		const element = document.getElementsByTagName('div')[0];
		expect(element.innerText).toBe(text);
	});

	it('can set local properties of the Tag', () => {
		new TestTag({ children: [tag] }).create();

		const element = document.body.children[0] as HTMLElement;
		expect(element.children.length).toBe(1);
	});

	it('should add event listeners to the element', () => {
		const clickSpy = jasmine.createSpy('clickSpy');
		tag.onClick(clickSpy).create();
		tag['element'].click();
		expect(clickSpy).toHaveBeenCalled();
	});

	it('can add a click event listener', () => {
		const clickSpy = jasmine.createSpy('clickSpy');
		tag.on('click', clickSpy).create();
		tag['element'].click();
		expect(clickSpy).toHaveBeenCalled();
	});

	it('should type check the event listener', () => {
		// This should throw a type error
		// @ts-expect-error
		tag.on('asdf', () => 'not a function');
	});

	it('should create a child element', () => {
		const child = new TestTag({ text: 'Child' });
		tag.populate([child]).create();

		const children = tag['element'].children;
		expect(children.length)
			.withContext('Expected one child element')
			.toEqual(1);
		expect((children[0] as HTMLElement).innerText)
			.withContext('Expected child inner html')
			.toEqual('Child');
	});

	it('should render the element', () => {
		const child = new TestTag({ text: 'Child' });
		tag.populate([child]).create();
		expect(child['element'].innerText).toBe('Child');
	});

	it('can set attributes via set()', () => {
		const id = 'test-id';
		const text = 'Updated Text';
		tag.set({ id, text }).create();

		expect(tag['element'].id).withContext('id').toBe(id);
		expect(tag['element'].innerText).withContext('innerText').toBe(text);
	});

	it('can update attributes via set()', () => {
		tag.create();

		const id = 'test-id';
		const text = 'Updated Text';
		tag.set({ id, text });

		expect(tag['element'].id).withContext('id').toBe(id);
		expect(tag['element'].innerText).withContext('innerText').toBe(text);
	});

	it('should not render attributes if not set', () => {
		tag.create();
		expect(tag['element'].id).toBe('');
	});

	it('should return the correct text when getting', () => {
		const text = 'Sample Text';
		tag.text.set(text);
		expect(tag.text.get()).toBe(text);
	});

	it('can append a child to the element', () => {
		const child = new TestTag({ text: 'Child' });
		tag.appendChild(child);
		tag.create();

		const children = tag['element'].children;
		expect(children.length).toBe(1);
		expect((children[0] as HTMLElement).innerText).toBe('Child');
	});

	it('appendChild() does not render the child until create() is called', () => {
		const child = new TestTag({ text: 'Child' });
		tag.create();
		tag.appendChild(child);

		const children = tag['element'].children;
		expect(children.length).toBe(0);
	});

	it('appendChild() can be called multiple times', () => {
		const child1 = new TestTag({ text: 'Child1' });
		const child2 = new TestTag({ text: 'Child2' });
		tag.appendChild(child1);
		tag.appendChild(child2);
		tag.create();

		const children = tag['element'].children;
		expect(children.length).toBe(2);
		expect((children[0] as HTMLElement).innerText).toBe('Child1');
		expect((children[1] as HTMLElement).innerText).toBe('Child2');
	});

	it('can create a child element', () => {
		const child = new TestTag({ text: 'Child' });
		tag.create();
		tag.createChild(child);

		const children = tag['element'].children;
		expect(children.length).toBe(1);
		expect((children[0] as HTMLElement).innerText).toBe('Child');
	});

	it('can nest child elements', () => {
		const parent = new TestTag({ id: 'parent' })
			.populate([
				new TestTag({ id: 'child' }).populate([
					new TestTag({ id: 'grandchild' }),
				]),
			])
			.create();

		const parentElement = document.querySelector('div');
		expect(parentElement?.id).toBe('parent');

		const childElement = parentElement?.children[0] as HTMLElement;
		expect(childElement.id).toBe('child');

		const grandchildElement = childElement.children[0] as HTMLElement;
		expect(grandchildElement.id).toBe('grandchild');
	});

	it('should set style when provided in options', () => {
		const tag = new TestTag({ style: { color: 'red' } }).create();
		expect(tag['element'].style.color).toBe('red');
	});

	it('should set style when provided via set()', () => {
		const tag = new TestTag().set({ style: { color: 'red' } }).create();
		expect(tag['element'].style.color).toBe('red');
	});

	it('can provide styling in a subclass', () => {
		class StyledTag extends TestTag {
			protected override defaultStyling(): Styling {
				return { color: 'green' };
			}
		}

		const tag = new StyledTag().create();
		expect(tag['element'].style.color).toBe('green');
	});
});
