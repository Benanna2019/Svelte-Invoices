<script lang="ts">
	import { currencyFormatter } from '$lib';
	import LabelText from '../../../../components/label-text.svelte';
	import { lineItemClassName } from '$lib';
	import type { PageServerData } from './$types.js';
	import Deposits from '../../../../components/deposits.svelte';
	import LineItemDisplay from '../../../../components/line-item-display.svelte';
	export let data: PageServerData;

	$: ({ invoiceDetails } = data);
</script>

<div class="relative p-10">
	<a
		href="../../customers/{invoiceDetails.customerId}"
		class="text-[length:14px] font-bold leading-6 text-blue-600 underline"
	>
		{invoiceDetails.customerName}
	</a>
	<div class="text-[length:32px] font-bold leading-[40px]">
		{currencyFormatter.format(invoiceDetails.totalAmount)}
	</div>
	<LabelText>
		<span
			class={invoiceDetails.dueStatus === 'paid'
				? 'text-green-brand'
				: invoiceDetails.dueStatus === 'overdue'
				? 'text-red-brand'
				: ''}
		>
			{invoiceDetails.dueDisplay}
		</span>
		• Invoiced {invoiceDetails.invoiceDateDisplay}
	</LabelText>
	<div class="h-4" />

	{#each invoiceDetails.lineItems as item}
		<LineItemDisplay
			description={item.description}
			unitPrice={item.unitPrice}
			quantity={item.quantity}
		/>
	{/each}

	<div class="{lineItemClassName} font-bold">
		<div>Net Total</div>
		<div>{currencyFormatter.format(invoiceDetails.totalAmount)}</div>
	</div>
	<div class="h-8" />
	<Deposits deposits={invoiceDetails.deposits} invoiceId={invoiceDetails.invoiceId} />
</div>
