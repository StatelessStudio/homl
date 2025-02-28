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
});
