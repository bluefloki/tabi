<script lang="ts">
	import classnames from 'classnames';
	import { createForm } from 'felte';
	import FormField from 'src/components/UI/FormField.svelte';
	import { LoaderIcon } from 'svelte-feather-icons';
	import { formButtonStyles } from '../styles';
	import { validator } from '@felte/validator-zod';
	import type { ValidatorConfig } from '@felte/validator-zod';
	import * as zod from 'zod';
	import { supabase } from 'src/utils/supabase';

	// Variables
	let loading: boolean = false;
	let message: { success: boolean | null; display: null | string } = {
		success: null,
		display: null
	};

	const schema = zod.object({
		email: zod.string().min(1, { message: 'Email is required' }),
		password: zod.string().min(8, { message: 'Password must be at least 8 characters long' })
	});
	interface ISignUpForm {
		email: string;
		password: string;
	}

	const handleSignUp = async (values: ISignUpForm) => {
		let user;
		const { email, password } = values;

		loading = true;
		try {
			const { error } = await supabase.auth.signUp({ email, password });
			console.log(error);
			if (error) throw error;
			message = {
				success: true,
				display: 'We have sent you an confirmation email. Please check your email'
			};
		} catch (error: any) {
			console.log(error);
			let errorMsg = error.error_description || error.message;
			message = { success: false, display: errorMsg };
		} finally {
			loading = false;
		}
	};

	const { form, reset, errors } = createForm<zod.infer<typeof schema>, ValidatorConfig>({
		extend: validator,
		validateSchema: schema,
		onSubmit: (values) => {
			handleSignUp(values);
			reset();
		}
	});
</script>

<div class="grid place-items-center h-screen">
	<form use:form class="w-96">
		<h1 class="font-oswald text-4xl mb-10">
			Sign Up for <span class="text-amber-400">Tabi</span>
		</h1>
		<FormField name="email" type="email" errors={$errors.email} />
		<FormField name="password" type="password" errors={$errors.password} />
		<div class="mb-6" />

		<p>
			Already have an account? click <a href="/login" class="text-amber-400">here</a> to Login
		</p>

		<p>Go back to <a href="/" class="text-amber-400">Homepage</a></p>
		<button
			type="submit"
			class={classnames(`${formButtonStyles('', true, 'full')}`)}
			disabled={loading}
			>{#if loading}
				<LoaderIcon size="1.5x" strokeWidth={1} class="animate-spin w-full text-center" />
			{:else}
				Sign Up
			{/if}
		</button>
		{#if message.success != null}
			<div
				class={classnames('font-oswald mt-4 text-center', {
					'text-red-400': message.success === false,
					'text-green-400': message.success === true
				})}
				role="alert"
			>
				{message.display}
			</div>
		{/if}
	</form>
</div>
