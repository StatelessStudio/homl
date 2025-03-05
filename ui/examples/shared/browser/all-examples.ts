import { Component } from '../../../ui-lib/dom/components';
import { Tag } from '../../../ui-lib/dom/tag';

import { example as example001 } from '../../001-name-display';
import { example as example002 } from '../../002-basic-todo';
import { example as example003 } from '../../003-bookmarks';
import { example as example004 } from '../../004-styling';
import { example as example005 } from '../../005-components';
import { example as example006 } from '../../006-page-layout';
import { example as example007 } from '../../007-basic-select';
import { example as example008 } from '../../008-advanced-select';

export const allExamples: { [name: string]: () => Tag | Component } = {
	'001-name-display': example001,
	'002-basic-todo': example002,
	'003-bookmarks': example003,
	'004-styling': example004,
	'005-components': example005,
	'006-page-layout': example006,
	'007-basic-select': example007,
	'008-advanced-select': example008,
};
