import 'jasmine';
import '../mock-dom';
import { Tag } from '../../../ui/ui-lib/dom/tag';

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

	it('should set the text content of the element', () => {
		const text = 'Hello, World!';
		tag.text.set(text);
		tag.create();
		expect(tag['element'].innerText).toBe(text);
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

	it('should create a child element', () => {
		tag.text.set('Parent');
		const child = new TestTag({ text: 'Child' });
		tag.populate([child]).create();

		const children = tag['element'].children;
		// TODO: Why is this failing with no children?
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
});
