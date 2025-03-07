import '../../mock-dom';
import { OptionGroupTag } from '../../../../ui/ui-lib/dom/tags/option-group';

describe('OptionGroupTag', () => {
	it('should create an OptionGroupTag with default values', () => {
		new OptionGroupTag().create();

		const optgroupElement = document.querySelector('optgroup');
		expect(optgroupElement).toBeTruthy();
		expect(optgroupElement?.tagName).toBe('OPTGROUP');
		expect(optgroupElement?.getAttribute('label')).toBeNull();
	});

	it('should set the label attribute', () => {
		new OptionGroupTag({
			label: 'Group 1',
		}).create();

		const optgroupElement = document.querySelector('optgroup');
		expect(optgroupElement?.getAttribute('label')).toBe('Group 1');
	});
});
