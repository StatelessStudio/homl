import { JSDOM } from 'jsdom';

// Mock the DOM
const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>');

global.window = window as any;
global.document = window.document;
global.navigator = {
	userAgent: 'node.js',
} as any;

beforeEach(() => {
	// Reset the dom before each test
	document.body.innerHTML = '';
	document.head.innerHTML = '';
});
