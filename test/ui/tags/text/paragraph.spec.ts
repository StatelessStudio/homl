import { ParagraphTag } from '../../../../ui/lib/tags/text/paragraph';

describe('ParagraphTag', () => {
	let paragraph: ParagraphTag;

	beforeEach(() => {
		paragraph = new ParagraphTag();
	});

	it('should have the correct tag name', () => {
		expect(paragraph.tag).toBe('p');
	});

	it('can set the text content', () => {
		const text = 'Hello, World!';
		paragraph.set({ text }).create();

		const paragraphElement = document.querySelector('p');
		expect(paragraphElement?.innerText).toBe(text);
	});
});
