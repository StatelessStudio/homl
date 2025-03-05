import { browser } from './shared/browser/browser';

import { applet } from '../ui-lib/applet/applet';
import { applyTheme } from './shared';

applet(() => {
	applyTheme();

	browser();
});
