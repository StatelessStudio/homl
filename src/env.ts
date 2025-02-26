import { AppConfig, configure } from 'ts-appconfig';

/**
 * Environment Variables Schema
 */
export class Environment extends AppConfig {
	readonly APP_TITLE = 'hyperclass';
}

/**
 * Load & export environment variables
 */
export const env: Environment = configure(Environment);
