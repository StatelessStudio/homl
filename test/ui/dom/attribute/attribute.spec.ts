import 'jasmine';
import { Attribute } from '../../../../ui/ui-lib/dom/attribute';

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

	it('can set the innerText of an element', () => {
		attribute = new Attribute({ name: 'innerText', value: 'test' });
		attribute.create({ element });
		expect(element.innerText).toBe('test');
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

	it('should return null if the attribute has not been set', () => {
		attribute = new Attribute({ name: 'id' });
		expect(attribute.get()).toBeNull();
	});

	it('should return true if the attribute value is null', () => {
		attribute = new Attribute({ name: 'id' });
		expect(attribute.isNull()).toBeTrue();
	});

	it('should return false if the attribute value is not null', () => {
		attribute = new Attribute({ name: 'id', value: 'test-id' });
		expect(attribute.isNull()).toBeFalse();
	});

	it('can return a value that has been modified by the user', () => {
		attribute = new Attribute({ name: 'value', value: '' });
		attribute.create({ element });

		(element as HTMLInputElement).value = 'new-id';

		expect(attribute.get()).toBe('new-id');
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

	it('can create an attribute with a boolean value', () => {
		const boolAttribute = new Attribute({ name: 'disabled', value: true });
		const inputElement = document.createElement('input');
		boolAttribute.create({ element: inputElement });
		expect(inputElement.disabled).toBeTrue();
	});

	it('can create an attribute with custom to/from functions', () => {
		class TestAttribute extends Attribute<string[]> {
			protected override toString(): string {
				return (this.value ?? []).join(' ');
			}

			protected override fromString(value: string): string[] {
				return value.split(' ');
			}
		}

		const classAttribute = new TestAttribute({
			name: 'custom',
			value: ['val1', 'val2'],
		});

		const divElement = document.createElement('div') as HTMLDivElement & {
			custom: string;
		};
		classAttribute.create({ element: divElement });
		expect(divElement.custom).toBe('val1 val2');
		expect(classAttribute.get()).toEqual(['val1', 'val2']);
	});
});
