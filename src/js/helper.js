function formatTime(s) {
	if (s < 3601) {
		const seconds = Math.floor(s % 60);
		const minutes = Math.floor(s / 60);
		const humanized = [
			pad(minutes.toString(), 2),
			pad(seconds.toString(), 2)
		].join(':');
		return humanized;
	}
	const hours = Math.floor(s / 60 / 60);
	const minutes = Math.floor((s / 60) % 60);
	const humanized = [pad(hours.toString(), 2), pad(minutes.toString(), 2)].join(
		':'
	);
	return humanized;
}

function pad(numberString, size) {
	let padded = numberString;
	while (padded.length < size) padded = `0${padded}`;
	return padded;
}

function alertMessage(flag) {
	const breakMsg = 'Good job. Take a break.';
	const startMsg = 'Break is over. Click Start for new Pomotris';
	flag === 'break' ? alert(breakMsg) : alert(startMsg);
}

module.exports = { formatTime, alertMessage };
