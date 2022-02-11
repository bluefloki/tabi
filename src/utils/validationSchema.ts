import * as zod from 'zod';

export const schema = zod.object({
	title: zod.string().min(1, { message: 'Title is required' }),
	objectives: zod.string().min(1, { message: 'Objectives are required' }),
	rewards: zod.string(),
	color: zod.string().min(1),
	emoji: zod
		.string()
		.min(1, { message: 'An Emoji is required' })
		.regex(
			RegExp(
				'(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])'
			),
			{ message: 'Only emojis are allowed' }
		)
});
