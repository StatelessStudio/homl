export class Attribute<T = string> {
	protected name: string;
	protected isSet = false;
	protected value: null | T = null;
	protected element?: HTMLElement;

	public constructor(options: { name: string; value?: T }) {
		this.name = options.name;

		if (options.value) {
			this.set(options.value);
		}
	}

	public create(options: { element: HTMLElement }) {
		this.element = options.element;

		if (this.value !== null) {
			this.render();
		}
	}

	public set(value: null | T) {
		this.value = value;
		this.isSet = true;
		this.render();
	}

	public render() {
		if (!this.element || !this.isSet) {
			return;
		}

		(this.element as any)[this.name] = this.value ?? '';
	}

	public get(): T {
		if (this.element && this.name in this.element) {
			this.value = (this.element as any)[this.name];
		}

		return this.value as T;
	}

	public isNull(): boolean {
		return this.value === null;
	}
}
