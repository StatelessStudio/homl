import { example } from './004-styling';

import { applet } from '../ui-lib/applet/applet';
import { applyTheme } from './shared';

applet(() => {
	applyTheme();

	example();
});
