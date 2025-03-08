export function applet(fn: () => void): void {
	window.addEventListener('load', fn);
}
