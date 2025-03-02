export function createStylesheet(): CSSStyleSheet {
	const element = document.createElement('style');
	element.innerHTML = '';
	document.head.appendChild(element);

	return document.styleSheets.item(0)!;
}
