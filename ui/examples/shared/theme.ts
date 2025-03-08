import { applyStyle, Styling } from '../../lib/style';

export function applyTheme() {
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
