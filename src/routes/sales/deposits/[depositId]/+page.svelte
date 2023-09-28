<script lang="ts">
	import TrashIcon from '../../../../components/trash-icon.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;

	$: ({ depositDetails } = data);
</script>

<div class="p-8">
	<div class="flex justify-between">
		{#if depositDetails.note}
			<span>
				Note:
				<br />
				<span class="pl-1">{depositDetails.note}</span>
			</span>
		{:else}
			<span class="text-m-p-sm md:text-d-p-sm uppercase text-gray-500"> No note </span>
		{/if}

		<!-- on:submit={handleSubmit} -->
		<div>
			<form method="POST" action="?/deleteDeposit">
				<input hidden readOnly name="invoiceId" value={depositDetails.invoiceId} />
				<input hidden readOnly name="intent" value="delete" />
				<input hidden readOnly name="depositId" value={depositDetails.id} />
				<button type="submit">
					<TrashIcon />
				</button>
			</form>
		</div>
	</div>
</div>
