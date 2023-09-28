<script lang="ts">
	import { currencyFormatter, lineItemClassName } from '$lib';
	import DetailsFallback from '../../../../components/details-fallback.svelte';
	import ErrorFallback from '../../../../components/error-fallback.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	$: ({ customerInfo, streamed } = data);
</script>

<div class="relative p-10">
	<div class="text-[length:14px] font-bold leading-6">
		{customerInfo.email}
	</div>
	<div class="text-[length:32px] font-bold leading-[40px]">
		{customerInfo.name}
	</div>
	<div class="h-4" />
	<div class="text-m-h3 font-bold leading-8">Invoices</div>
	<div class="h-4" />
	<!-- Handle deferred data loading here -->
	<table class="w-full">
		<tbody>
			{#await streamed.customerDetails}
				<div class="relative h-full">
					<DetailsFallback />
				</div>
			{:then customerDetails}
				{#if customerDetails}
					{#each customerDetails.invoiceDetails as details}
						<tr class={lineItemClassName}>
							<td>
								<a class="text-blue-600 underline" href="/sales/invoices/{details.id}">
									{details.number}
								</a>
							</td>
							<td
								class={'text-center uppercase' +
									' ' +
									(details.dueStatus === 'paid'
										? 'text-green-brand'
										: details.dueStatus === 'overdue'
										? 'text-red-brand'
										: '')}
							>
								{details.dueStatusDisplay}
							</td>
							<td class="text-right">
								{currencyFormatter.format(details.totalAmount)}
							</td>
						</tr>
					{/each}
				{:else}
					<ErrorFallback message="no customer details" />
				{/if}
			{:catch error}
				<ErrorFallback message={error} />
			{/await}
		</tbody>
	</table>
</div>
