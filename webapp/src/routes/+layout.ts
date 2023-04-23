import type { LayoutLoad } from './$types';
import type { Locales } from '$i18n/i18n-types';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import LL, { setLocale } from '$i18n/i18n-svelte';
import { get } from 'svelte/store';

