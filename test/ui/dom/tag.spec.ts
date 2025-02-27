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
		tag.setText(text).create();
		expect(tag['element'].innerHTML).toBe(text);
	});

	it('should add event listeners to the element', () => {
		const clickSpy = jasmine.createSpy('clickSpy');
		tag.onClick(clickSpy).create();
		tag['element'].click();
		expect(clickSpy).toHaveBeenCalled();
	});

	it('should create a child element', () => {
		tag.setText('Parent');
		const child = new TestTag({ text: 'Child' });
		tag.populate([child]).create();

		const children = tag['element'].children;
		// TODO: Why is this failing with no children?
		expect(children.length)
			.withContext('Expected one child element')
			.toEqual(1);
		expect((children[0] as HTMLElement).innerHTML)
			.withContext('Expected child inner html')
			.toEqual('Child');
	});

	it('should render the element', () => {
		const child = new TestTag({ text: 'Child' });
		tag.populate([child]).create();
		expect(child['element'].innerHTML).toBe('Child');
	});

	it('should update text content when setText is called', () => {
		tag.create();

		const text = 'Updated Text';
		tag.setText(text).render();

		expect(tag['element'].innerHTML).toBe(text);
	});

	it('should return the correct text when getText is called', () => {
		const text = 'Sample Text';
		tag.setText(text);
		expect(tag.getText()).toBe(text);
	});
});
