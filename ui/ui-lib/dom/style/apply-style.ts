import { Styling } from './index';
import { createStylesheet } from './stylesheet';

export function applyStyle(
	elements: string | HTMLElement,
	style: Styling
): void {
	if (typeof elements === 'string') {
		applyStyleToDom({ selector: elements, style });
	}
	else {
		applyStyleToElement(elements, style);
	}
}

export function applyStyleToDom(options: {
	selector: string;
	style: Styling;
	stylesheet?: CSSStyleSheet;
}): number {
	const stylesheet =
		options.stylesheet ??
		document.styleSheets.item(0) ??
		createStylesheet();

	const rules = Object.keys(options.style)
		.map(
			(rule) =>
				`${convertStylingRuleName(rule)}: ${options.style[rule as any]}`
		)
		.join('; ');

	return stylesheet.insertRule(`${options.selector} { ${rules} }`);
}

export function applyStyleToElement(
	element: HTMLElement,
	style: Styling
): void {
	const elementStyle = element.style;
	for (const [rule, value] of Object.entries(style)) {
		elementStyle[convertStylingRuleName(rule) as any] = <any>value;
	}
}

export function convertStylingRuleName(rule: string): string {
	return rule.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}
