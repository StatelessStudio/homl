import { applet } from '../ui-lib/applet/applet';

import { DivTag } from '../ui-lib/dom/tags/div';
import { ButtonTag } from '../ui-lib/dom/tags/button';
import { InputTag } from '../ui-lib/dom/tags/input';
import { UnorderedListTag } from '../ui-lib/dom/tags/unordered-list';
import { ListItemTag } from '../ui-lib/dom/tags/list-item';
import { applyStyle, px, Styling } from '../ui-lib/dom/style';

export class PageContainer extends DivTag {
	public override defaultStyling(): Styling {
		return {
			...super.defaultStyling(),
			margin: 'auto',
			maxWidth: px(800),
		};
	}
}

applet(() => {
	applyTheme();

	const todoList = new UnorderedListTag();
	const todoInput = new InputTag({ placeholder: 'Enter a todo' });
	const todoButton = new ButtonTag({ text: 'Add Todo' }).onClick(() =>
		addTodo()
	);

	new PageContainer({ style: { padding: '20px', maxWidth: '400px' } })
		.populate([todoInput, todoButton, todoList])
		.create();

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
});

function applyTheme() {
	const styleTheme: Styling = {
		backgroundColor: '#333',
		color: '#efefef',
		fontFamily: 'Arial, sans-serif',
	};

	applyStyle('body', styleTheme);

	const inputStyle: Styling = {
		display: 'block',
		width: '100%',
		marginBottom: '1em',
		padding: '10px',
		border: 'none',
		borderRadius: '8px',
		outline: '1px solid #007bff55',
		transition: 'background-color 0.3s',
	};

	applyStyle('input, button', inputStyle);

	const buttonStyle: Styling = {
		backgroundColor: '#007bff',
		color: 'white',
		cursor: 'pointer',
	};

	applyStyle('button', buttonStyle);
}
