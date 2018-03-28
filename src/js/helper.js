function formatTime(s) {
	const seconds = Math.floor(s % 60);
	const minutes = Math.floor(s / 60);
	const humanized = [
		pad(minutes.toString(), 2),
		pad(seconds.toString(), 2)
	].join(':');
	return humanized;
}

function pad(numberString, size) {
	let padded = numberString;
	while (padded.length < size) padded = `0${padded}`;
	return padded;
}

function alertMessage() {
	const message = 'Good job. Take a break.';
	alert(message);
}
module.exports = { formatTime, alertMessage };
