<script>
	import LabelText from '../../../components/label-text.svelte';
	import InvoicesInfo from '../../../components/invoices-info.svelte';
	import InvoiceList from '../../../components/invoices-list.svelte';
	/** import("./$types").LayoutData */
	export let data;

	const { invoiceListItems, dueSoonAmount, overdueAmount } = data;
	const hundo = dueSoonAmount + overdueAmount;
	const dueSoonPercent = Math.floor((dueSoonAmount / hundo) * 100);
</script>

<div class="relative">
	<div class="flex items-center justify-between gap-4">
		<InvoicesInfo label="Overdue" amount={overdueAmount} />
		<div class="flex h-4 flex-1 overflow-hidden rounded-full">
			<div class="bg-yellow-brand flex-1" />
			<div class="bg-green-brand" style="width: {dueSoonPercent}%" />
		</div>
		<InvoicesInfo label="Due Soon" amount={dueSoonAmount} right />
	</div>
	<div class="h-4" />
	<LabelText>Invoice List</LabelText>
	<div class="h-2" />
	<InvoiceList {invoiceListItems}>
		<slot />
	</InvoiceList>
</div>
