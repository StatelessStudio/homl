import 'jasmine';
import { Attribute } from '../../../ui/ui-lib/dom/attribute';

describe('Attribute', () => {
	let attribute: Attribute;
	let element: HTMLElement;

	beforeEach(() => {
		element = document.createElement('div');
	});

	it('should initialize with a name and optional value', () => {
		attribute = new Attribute({ name: 'id', value: 'test-id' });
		expect(attribute.get()).toBe('test-id');
	});

	it('should set the attribute value', () => {
		attribute = new Attribute({ name: 'id' });
		attribute.set('test-id');
		expect(attribute.get()).toBe('test-id');
	});

	it('should create and render the attribute on the element', () => {
		attribute = new Attribute({ name: 'id', value: 'test-id' });
		attribute.create({ element });
		expect(element.id).toBe('test-id');
	});

	it('should update the attribute value on the element', () => {
		attribute = new Attribute({ name: 'id' });
		attribute.create({ element });
		attribute.set('new-id');
		expect(element.id).toBe('new-id');
	});

	it('should return the correct value when getting', () => {
		attribute = new Attribute({ name: 'id', value: 'test-id' });
		attribute.create({ element });
		expect(attribute.get()).toBe('test-id');
	});

	it('should return an empty string if the attribute is not set', () => {
		attribute = new Attribute({ name: 'id' });
		expect(attribute.get()).toBe('');
	});

	it('should return true if the attribute value is null', () => {
		attribute = new Attribute({ name: 'id' });
		expect(attribute.isNull()).toBeTrue();
	});

	it('should return false if the attribute value is not null', () => {
		attribute = new Attribute({ name: 'id', value: 'test-id' });
		expect(attribute.isNull()).toBeFalse();
	});

	it('can set the value back to null', () => {
		attribute = new Attribute({ name: 'id', value: 'test-id' });
		attribute.create({ element });
		attribute.set('test-id');
		expect(attribute.get()).toBe('test-id');
		attribute.set(null);
		expect(attribute.get()).toBe('');
	});

	it('should not render the attribute if the value is null', () => {
		attribute = new Attribute({ name: 'id', value: 'test-id' });
		attribute.create({ element });
		attribute.set(null);
		expect(element.id).toBe('');
	});
});
