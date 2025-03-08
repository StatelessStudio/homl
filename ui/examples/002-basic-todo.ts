import { ButtonTag, InputTag } from '../lib/tags/form';
import { ListItemTag, UnorderedListTag } from '../lib/tags/list';
import { PageContainer } from './shared';

export function example() {
	let todoList: UnorderedListTag, todoInput: InputTag;

	const page = new PageContainer().populate([
		(todoInput = new InputTag({ placeholder: 'Enter a new todo' })),
		new ButtonTag({ text: 'Add Todo' }).onClick(() => addTodo()),
		(todoList = new UnorderedListTag()),
	]);

	function addTodo() {
		const text = todoInput.value.get();

		if (text) {
			const listItem = new ListItemTag({ text });
			todoList.createChild(listItem);
			todoInput.value.set('');
		}
	}

	return page;
}
