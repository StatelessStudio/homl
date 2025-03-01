import './mock-dom';

beforeEach(() => {
	// Reset the dom before each test
	document.body.innerHTML = '';
});

describe('DOM Mocking', () => {
	it('should create a div element', () => {
		const div = document.createElement('div');
		div.id = 'test-div';
		document.body.appendChild(div);

		const testDiv = document.getElementById('test-div');
		expect(testDiv).not.toBeNull();
		expect(testDiv?.id).toBe('test-div');
	});
});
