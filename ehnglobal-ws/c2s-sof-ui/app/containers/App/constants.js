/*
* AppConstants
* Each action has a corresponding type, which the reducer knows and picks up on.
* To avoid weird typos between the reducer and the actions, we save them as
* constants here. We prefix them with 'yourproject/YourComponent' so we avoid
* reducers accidentally picking up actions they shouldn't.
*
* Follow this format:
* export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
*/

export const DEFAULT_LOCALE = 'en';

/**
 *  Action type related constants
 * @type {string}
 */
export const GET_LOOKUPS = 'c2s/App/GET_LOOKUPS';
export const GET_LOOKUPS_SUCCESS = 'c2s/App/GET_LOOKUPS_SUCCESS';
export const GET_LOOKUPS_FROM_STORE = 'c2s/App/GET_LOOKUPS_FROM_STORE';
export const GET_LOOKUPS_ERROR = 'c2s/App/GET_LOOKUPS_ERROR';

export const GET_CONFIG = 'ocpui/App/GET_CONFIG';
export const GET_CONFIG_SUCCESS = 'ocpui/App/GET_CONFIG_SUCCESS';
export const GET_CONFIG_ERROR = 'ocpui/App/GET_CONFIG_ERROR';

/**
 *  Global object keys
 * @type {string}
 */
export const GLOBAL_LOOKUP_STATE_KEY = 'lookup';

/**
 * Look up types constants
 * @type {string}
 */
export const CONSENT_STATE_CODES = 'CONSENT_STATE_CODES';
export const CONSENT_CATEGORY = 'CONSENT_CATEGORY';
export const SECURITY_ROLE_TYPE = 'SECURITY_ROLE_TYPE';
export const SECURITY_LABEL = 'SECURITY_LABEL';
export const CONSENT_ACTION = 'CONSENT_ACTION';
export const PURPOSE_OF_USE = 'PURPOSE_OF_USE';

/**
 *  Constants to hold the default pagination page size and start page number
 * @type {number}
 */
export const DEFAULT_START_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;

/**
 *  Other constants
 */
export const EMPTY_STRING = '';
export const NEW_LINE_CHARACTER = '\n';
