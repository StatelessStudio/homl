import '../../mock-dom';

import { createStylesheet } from '../../../../ui/ui-lib/dom/style/stylesheet';

describe('createStylesheet', () => {
	it('should create a new stylesheet and append it to the document head', () => {
		const initialStyleSheetCount = document.styleSheets.length;

		createStylesheet();

		expect(document.styleSheets.length).toBe(initialStyleSheetCount + 1);
	});

	it('should return the newly created stylesheet', () => {
		const stylesheet = createStylesheet();

		expect(
			document.styleSheets.item(document.styleSheets.length - 1)
		).toEqual(stylesheet);
	});
});
