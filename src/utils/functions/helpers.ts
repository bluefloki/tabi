// Time Functions
export const formatTime = (value: number) => {
	const h = Math.floor(value / 3600);
	const m = Math.floor((value % 3600) / 60);
	const s = Math.floor((value % 3600) % 60);

	return `${padWithZeroes(h)} : ${padWithZeroes(m)} : ${padWithZeroes(s)}`;
};

export const padWithZeroes = (number: number) => number.toString().padStart(2, '0');

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const convertToSeconds = (hrs: string, mins: string, secs: string) => {
	const h = hrs == '' ? '0' : hrs;
	const m = mins == '' ? '0' : mins;
	const s = secs == '' ? '0' : secs;
	return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
};

export const convertFromSeconds = (totalSeconds: number) => {
	let h = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	let m = Math.floor(totalSeconds / 60);
	let s = totalSeconds % 60;

	return { h, m, s };
};
