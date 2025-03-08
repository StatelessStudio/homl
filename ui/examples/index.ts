import { browser } from './shared/browser/browser';

import { applet } from '../lib/applet/applet';
import { applyTheme } from './shared';

applet(() => {
	applyTheme();

	browser();
});
