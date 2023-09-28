<script>
	import { inputClasses, submitButtonClasses } from '$lib';

	import LabelText from '../../../../components/label-text.svelte';
</script>

<div class="relative p-10">
	<h2 class="font-display mb-4">New Customer</h2>
	<form method="POST" action="?/create" class="flex flex-col gap-4">
		<div>
			<label for="name">
				<LabelText>Name</LabelText>
			</label>
			<input id="name" name="name" class={inputClasses} type="text" />
		</div>
		<div>
			<label for="email">
				<LabelText>Email</LabelText>
			</label>
			<input id="email" name="email" class={inputClasses} type="email" />
		</div>
		<input hidden readOnly name="intent" value="create" />
		<div>
			<button type="submit" class={submitButtonClasses}> Create Customer </button>
		</div>
	</form>
</div>
