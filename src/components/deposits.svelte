<script lang="ts">
	import { currencyFormatter, inputClasses, lineItemClassName, submitButtonClasses } from '$lib';
	import LabelText from './label-text.svelte';

	export let deposits: {
		id: string;
		amount: number;
		depositDateFormatted: string;
	}[];
	export let invoiceId: string;
</script>

<div>
	<div class="font-bold leading-8">Deposits</div>

	{#each deposits as deposit}
		<div class={lineItemClassName}>
			<a href="/sales/deposits/{deposit.id}" class="text-blue-600 underline">
				{deposit.depositDateFormatted}
			</a>
			<div>{currencyFormatter.format(deposit.amount)}</div>
		</div>
	{/each}

	<!-- on:submit={handleSubmit} -->

	<form
		method="POST"
		action="?/createDeposit"
		class="grid grid-cols-1 gap-x-4 gap-y-2 lg:grid-cols-2"
		noValidate
	>
		<div class="min-w-[100px]">
			<div class="flex flex-wrap items-center gap-1">
				<LabelText>
					<label for="depositAmount">Amount</label>
				</LabelText>
			</div>
			<input
				id="depositAmount"
				name="amount"
				type="number"
				class={inputClasses}
				min="0.01"
				step="any"
				required
			/>
		</div>
		<div>
			<div class="flex flex-wrap items-center gap-1">
				<LabelText>
					<label for="depositDate">Date</label>
				</LabelText>
			</div>
			<input
				id="depositDate"
				name="depositDate"
				type="date"
				class={`${inputClasses} h-[34px]`}
				required
			/>
		</div>
		<div class="grid grid-cols-1 gap-4 lg:col-span-2 lg:flex">
			<div class="flex-1">
				<LabelText>
					<label for="depositNote">Note</label>
				</LabelText>
				<input id="depositNote" name="note" type="text" class={inputClasses} />
			</div>
			<div class="flex items-end">
				<input hidden readOnly name="intent" value="create-deposit" />
				<input hidden readOnly name="invoiceId" value={invoiceId} />
				<button type="submit" class={submitButtonClasses}> Create </button>
			</div>
		</div>
	</form>
</div>
