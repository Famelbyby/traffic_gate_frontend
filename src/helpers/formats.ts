export function PadStart(data: number, len = 2, fillBy = '0') {
	return String(data).padStart(len, fillBy);
}

export function FormatTimestamp(timestamp: number) {
	const date = new Date(timestamp);

	const s = date.getSeconds();
	const minutes = date.getMinutes();
	const hours = date.getHours();

	return `${PadStart(hours)}:${PadStart(minutes)}:${PadStart(s)}`;
}

export function FormatWorkTime(ms: number) {
	ms /= 1000;

	const h = Math.floor(ms / 3600);
	const m = Math.floor((ms % 3600) / 60);
	const s = Math.floor(ms % 60);

	return `${PadStart(h)}:${PadStart(m)}:${PadStart(s)}`;
}