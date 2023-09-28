<script lang="ts">
	import type { PageServerData } from './$types.js';
	import type { ActionData } from './$types.js';
	import { enhance } from '$app/forms';
	import { inputClasses, submitButtonClasses } from '$lib';
	import LabelText from '../../../../components/label-text.svelte';
	import LineItems from '../../../../components/line-items.svelte';

	export let data: PageServerData;
	const { customers } = data;
	export let form: ActionData;

	console.log('form errors', form?.errors);
</script>

<div class="relative p-10">
	<h2 class="font-display mb-4">New Invoice</h2>
	<form method="POST" action="?/create" class="flex flex-col gap-4">
		<div class="relative">
			<div class="flex flex-wrap items-center gap-1">
				<label for="customers">
					<LabelText>Customer</LabelText>
					{#if form?.errors?.customerId}
						<em id="dueDate-error" class="text-d-p-xs text-red-600">
							{form.errors.customerId}
						</em>
					{/if}
				</label>
				<select
					name="customerId"
					id="customerId"
					aria-invalid={Boolean(form?.errors?.customerId) || undefined}
					aria-errormessage={form?.errors?.customerId ? 'customer id' : undefined}
				>
					{#each customers as customer}
						<option value={customer.id}>
							{customer.name}
						</option>
					{/each}
				</select>
			</div>
		</div>
		<div>
			<div class="flex flex-wrap items-center gap-1">
				<label for="dueDate">
					<LabelText>Due Date</LabelText>
				</label>

				{#if form?.errors?.dueDate}
					<em id="dueDate-error" class="text-d-p-xs text-red-600">
						{form.errors.dueDate}
					</em>
				{/if}
			</div>
			<input
				id="dueDate"
				name="dueDateString"
				class={inputClasses}
				type="date"
				required
				aria-invalid={Boolean(form?.errors?.dueDate) || undefined}
				aria-errormessage={form?.errors?.dueDate ? 'dueDate-error' : undefined}
			/>
			<input hidden readOnly name="intent" value="create" />
		</div>
		<LineItems error={form?.errors?.lineItems} />
		<div>
			<button type="submit" class={submitButtonClasses}> Create Invoice </button>
		</div>
	</form>
</div>
