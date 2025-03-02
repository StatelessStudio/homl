import { ButtonTag } from '../ui-lib/dom/tags/button';
import { InputTag } from '../ui-lib/dom/tags/input';
import { UnorderedListTag } from '../ui-lib/dom/tags/unordered-list';
import { ListItemTag } from '../ui-lib/dom/tags/list-item';
import { PageContainer } from './shared';

export function example() {
	let todoList: UnorderedListTag, todoInput: InputTag;

	new PageContainer()
		.populate([
			(todoInput = new InputTag({ placeholder: 'Enter a new todo' })),
			new ButtonTag({ text: 'Add Todo' }).onClick(() => addTodo()),
			(todoList = new UnorderedListTag()),
		])
		.create();

	function addTodo() {
		const text = todoInput.value.get();

		if (text) {
			const listItem = new ListItemTag({ text });
			todoList.createChild(listItem);
			todoInput.value.set('');
		}
	}
}
