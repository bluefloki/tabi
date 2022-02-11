import classnames from 'classnames';

export const buttonStyles = (color: string, questCompleted: boolean = false) =>
	classnames(
		`px-4 py-1 rounded font-oswald text-lg  text-center w-full hover:bg-white transition-all ease-linear 
				duration-300 disabled:hover:bg-${color}-100 disabled:hover:cursor-not-allowed`,
		{
			'text-amber-500 bg-amber-100': questCompleted,
			[`text-${color}-500 bg-${color}-100`]: !questCompleted
		}
	);

export const formButtonStyles = (color?: string, primary: boolean = true, width: string = '40') =>
	classnames(
		`mt-10 px-4 py-2 rounded-lg w-${width} font-medium transition-all ease-linear duration-300 disabled:cursor-not-allowed font-oswald`,
		{
			[`bg-${color}-500 text-${color}-100 hover:bg-${color}-400 disabled:hover:bg-${color}-500`]:
				!primary,
			'bg-white text-neutral-800 hover:bg-amber-400 disabled:hover:bg-white': primary
		}
	);

export const drawerLabelStyles = 'col-span-1 text-2xl font-oswald';

export const timerInputStyles =
	'col-span-3 bg-neutral-700 px-4 py-2 text-lg rounded-lg appearance-none w-16 text-center';
export const drawerInputStyles = 'col-span-3 bg-neutral-700 px-4 py-2 text-lg rounded-lg';

export const formFieldStyles = 'grid grid-cols-4 gap-10 items-center mb-6';

export const labelStyles = 'text-2xl font-oswald';

export const inputStyles = 'bg-neutral-700 px-4 py-2 text-lg rounded-lg appearance-none w-96';
