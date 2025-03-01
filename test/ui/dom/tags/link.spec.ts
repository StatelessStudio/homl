import 'jasmine';
import { LinkTag } from '../../../../ui/ui-lib/dom/tags/link';

describe('LinkTag', () => {
	let linkTag: LinkTag;

	beforeEach(() => {
		linkTag = new LinkTag();
	});

	it('should create an instance of LinkTag', () => {
		linkTag.create();
		expect(document.querySelector('a')).toBeTruthy();
	});

	it('should have default tag as "a"', () => {
		linkTag.create();
		expect(linkTag['tag']).toBe('a');
	});

	it('should set href attribute', () => {
		linkTag.create();
		linkTag.href.set('https://example.com');
		expect(document.querySelector('a')?.getAttribute('href')).toBe(
			'https://example.com'
		);
	});

	it('should set target attribute', () => {
		linkTag.create();
		linkTag.target.set('_blank');
		expect(document.querySelector('a')?.getAttribute('target')).toBe(
			'_blank'
		);
	});

	it('should set rel attribute', () => {
		linkTag.create();
		linkTag.rel.set('noopener');
		expect(document.querySelector('a')?.getAttribute('rel')).toBe(
			'noopener'
		);
	});

	it('should set multiple attributes', () => {
		linkTag.create();
		linkTag.set({
			href: 'https://example.com',
			target: '_blank',
			rel: 'noopener',
		});
		const linkElement = document.querySelector('a');
		expect(linkElement?.getAttribute('href')).toBe('https://example.com');
		expect(linkElement?.getAttribute('target')).toBe('_blank');
		expect(linkElement?.getAttribute('rel')).toBe('noopener');
	});
});
