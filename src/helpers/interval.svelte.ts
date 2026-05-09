import type { MetricsUpdateInterval } from "~/types/metrics";
import { findCookie } from "./findCookie";

let interval = $state<MetricsUpdateInterval | undefined>(undefined);

export function getInterval() {
    return interval;
}

export function updateIntervalCookie(nextInterval?: MetricsUpdateInterval) {
    const doc = findCookie('interval');

	switch (nextInterval) {
		case undefined:
			interval = <MetricsUpdateInterval>doc?.split('=')[1] || '3s';
			break;
		case '3s':
			document.cookie = 'interval=3s';
			interval = '3s';
			break;
		case '5s':
			document.cookie = 'interval=5s';
			interval = '5s';
			break;
        case '15s':
			document.cookie = 'interval=15s';
			interval = '15s';
			break;
        case '30s':
			document.cookie = 'interval=30s';
			interval = '30s';
			break;
        case '1m':
			document.cookie = 'interval=1m';
			interval = '1m';
			break;
	}
}
