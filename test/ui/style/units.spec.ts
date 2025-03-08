import '../mock-dom';
import { px } from '../../../ui/lib/style/units';

describe('px', () => {
	it('should append "px" to a number', () => {
		expect(px(10)).toBe('10px');
	});

	it('should append "px" to a string number', () => {
		expect(px('20')).toBe('20px');
	});

	it('should handle zero correctly', () => {
		expect(px(0)).toBe('0px');
	});

	it('should handle negative numbers', () => {
		expect(px(-5)).toBe('-5px');
	});

	it('should handle empty string', () => {
		expect(px('')).toBe('px');
	});
});
