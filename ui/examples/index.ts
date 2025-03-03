import { example } from './006-page-layout';

import { applet } from '../ui-lib/applet/applet';
import { applyTheme } from './shared';

applet(() => {
	applyTheme();

	example();
});
