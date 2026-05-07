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