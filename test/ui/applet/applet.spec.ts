import 'jasmine';
import '../mock-dom';
import { applet } from '../../../ui/ui-lib/applet/applet';

describe('applet', function () {
	let eventListenerSpy: jasmine.Spy;

	beforeEach(function () {
		eventListenerSpy = spyOn(global.window, 'addEventListener');
	});

	it('should add an event listener for the load event', function () {
		const fn = jasmine.createSpy('fn');
		applet(fn);
		expect(eventListenerSpy).toHaveBeenCalledWith('load', fn);
	});
});
