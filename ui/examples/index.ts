import { example } from './007-basic-select';

import { applet } from '../ui-lib/applet/applet';
import { applyTheme } from './shared';

applet(() => {
	applyTheme();

	example();
});
