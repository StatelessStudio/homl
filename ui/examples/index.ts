import { example } from './005-components';

import { applet } from '../ui-lib/applet/applet';
import { applyTheme } from './shared';

applet(() => {
	applyTheme();

	example();
});
