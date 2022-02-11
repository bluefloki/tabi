export interface IFormValues {
	title: string;
	objectives: string;
	rewards?: string;
	color: string;
	emoji: string;
}

export interface IQuestFormData extends IFormValues {
	countdown?: boolean;
	timer?: number;
	id?: number;
	created_at?: Date;
	completed?: boolean;
	init?: boolean;
	user_id: string;
}

export interface IQuest extends IQuestFormData {
	id: number;
	created_at: Date;
	completed: boolean;
}
