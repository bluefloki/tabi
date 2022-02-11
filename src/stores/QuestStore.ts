import { writable } from 'svelte/store';
import type { IQuest, IQuestFormData } from '../utils/types';

export const quests = writable<IQuest[]>([]);
export const questsTimeout = writable(false);
export const timerInterval = writable();

export const initQuestForm: IQuestFormData | IQuest = {
	title: '',
	objectives: '',
	rewards: '',
	color: 'red',
	emoji: '',
	countdown: false,
	timer: 0,
	init: true
};

export const questFormData = writable<IQuest | IQuestFormData>({
	...initQuestForm
});
