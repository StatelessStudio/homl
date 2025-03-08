import { ButtonTag, InputTag } from '../lib/tags/form';
import { ListItemTag, UnorderedListTag } from '../lib/tags/list';
import { PageContainer } from './shared/page-container';

// Look at applyTheme() from shared/theme.ts and page-container.ts for
//	more examples & info on how to apply styles to elements

export function example() {
	const todoList = new UnorderedListTag();
	const todoInput = new InputTag({ placeholder: 'Enter a todo' });
	const todoButton = new ButtonTag({ text: 'Add Todo' }).onClick(() =>
		addTodo()
	);

	const page = new PageContainer({
		style: { padding: '40px', maxWidth: '400px' },
		children: [todoInput, todoButton, todoList],
	});

	function addTodo() {
		const text = todoInput.value.get();

		if (text) {
			const listItem = new ListItemTag({ text });
			todoList.createChild(listItem);
			todoInput.style.set({ backgroundColor: '#ccffcc' });

			setTimeout(resetInput, 500);
		}
		else {
			todoInput.set({
				placeholder: 'Please enter a todo first!',
				style: { backgroundColor: '#ffcccc' },
			});

			setTimeout(resetInput, 750);
		}

		todoInput.element.focus();
	}

	function resetInput() {
		todoInput.set({
			value: '',
			placeholder: 'Enter a todo',
			style: { backgroundColor: '' },
		});
	}

	return page;
}
