import { ButtonTag, InputTag } from '../lib/tags/form';
import { Component } from '../lib/components';
import { ParagraphTag } from '../lib/tags/text/paragraph';
import { PageContainer } from './shared';
import { ListItemTag, UnorderedListTag } from '../lib/tags/list';
import { Styling } from '../lib/style';
import { DivTag } from '../lib/tags/layout/div';

export class TodoList extends Component {
	protected items: TodoItem[] = [];

	protected list = new UnorderedListTag();
	protected form = new TodoForm({ onSubmit: (text) => this.addItem(text) });

	public prepopulateButton = new ButtonTag({
		text: 'Prepopulate',
		style: inlineButtonStyle,
	}).onClick(() => this.prepopulate());

	public make() {
		return new PageContainer().populate([
			this.form,
			this.list,
			this.prepopulateButton,
		]);
	}

	public addItem(text: string) {
		const item = new TodoItem(text);
		this.items.push(item);
		this.list.createChild(item);
	}

	public prepopulate() {
		for (let i = 0; i < 50; i++) {
			this.addItem(`Todo ${i + 1}`);
		}
	}
}

export class TodoForm extends Component {
	protected input = new InputTag({ placeholder: 'Enter a todo' });
	protected button = new ButtonTag({
		text: 'Add Todo',
	}).onClick(() => this.submitForm());

	public constructor(public options: { onSubmit: (text: string) => void }) {
		super();
	}

	public make() {
		return new DivTag().populate([this.input, this.button]);
	}

	public submitForm() {
		const text = this.input.value.get();

		if (text) {
			this.options.onSubmit(text);
			this.input.set({ value: '' });
		}
	}
}

export class TodoItem extends Component {
	protected textTag: ParagraphTag;

	public constructor(
		public text: string,
		public isDone = false
	) {
		super();

		this.textTag = new ParagraphTag({
			text: this.text,
			style: inlineButtonStyle,
		});
	}

	public toggleButton = new ButtonTag({
		text: 'Done',
		style: inlineButtonStyle,
	}).onClick(() => this.toggle());

	public removeButton = new ButtonTag({
		text: 'Remove',
		style: { ...inlineButtonStyle, ...redButtonStyle },
	}).onClick(() => this.remove());

	public override make() {
		return new ListItemTag().populate([
			this.textTag,
			this.toggleButton,
			this.removeButton,
		]);
	}

	protected toggle() {
		this.isDone ? this.undo() : this.complete();
	}

	protected complete() {
		this.textTag.set({ style: { textDecoration: 'line-through' } });
		this.toggleButton.set({ text: 'Undo' });
		this.isDone = true;
	}

	protected undo() {
		this.textTag.set({ style: { textDecoration: 'none' } });
		this.toggleButton.set({ text: 'Done' });
		this.isDone = false;
	}
}

const inlineButtonStyle: Styling = {
	display: 'inline',
	width: 'unset',
	padding: '5px 10px',
	marginRight: '1em',
};

const redButtonStyle: Styling = {
	backgroundColor: 'red',
	outlineColor: 'red',
};

export function example() {
	return new TodoList();
}
