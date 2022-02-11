<script>
	import 'src/styles/tailwind.css';
	import 'src/styles/fonts.css';
	import 'src/styles/app.css';
	import { user } from 'src/stores';
	import { supabase } from 'src/utils/supabase';

	// Authorization
	user.set(supabase.auth.user());
	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
	});
</script>

<div class="bg-neutral-800 text-white">
	<slot />
</div>
