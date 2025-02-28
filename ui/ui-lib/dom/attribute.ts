export class Attribute {
	protected name: string;
	protected isSet = false;
	protected value: null | string = null;
	protected element?: HTMLElement;

	public constructor(options: { name: string; value?: string }) {
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

	public set(value: null | string) {
		this.value = value;
		this.isSet = true;
		this.render();
	}

	public render() {
		if (!this.element || !this.isSet) {
			return;
		}

		//@ts-ignore
		this.element[this.name] = this.value ?? '';
	}

	public get(): string {
		if (this.element && this.name in this.element) {
			//@ts-ignore
			this.value = this.element[this.name];
		}

		return this.value ?? '';
	}

	public isNull(): boolean {
		return this.value === null;
	}
}
