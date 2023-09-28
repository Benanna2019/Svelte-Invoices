<script lang="ts">
	import { currencyFormatter, type InvoiceListItems } from '$lib/index';
	import FilePlusIcon from './file-plus-icon.svelte';
	import { page } from '$app/stores';

	export let invoiceListItems: InvoiceListItems;
</script>

<div class="flex overflow-hidden rounded-lg border border-gray-100">
	<div class="w-1/2 border-r border-gray-100">
		<div class="block border-b-4 border-gray-100 py-3 px-4 hover:bg-gray-50">
			<a href="/sales/invoices/new">
				<span class="flex gap-1">
					<FilePlusIcon /> <span>Create new invoice</span>
				</span>
			</a>
		</div>
		<div class="max-h-96 overflow-y-scroll">
			{#each invoiceListItems as invoice}
				<a
					href="/sales/invoices/{invoice.id}"
					class={'block border-b border-gray-50 py-3 px-4 hover:bg-gray-50' +
						' ' +
						($page.url.pathname === `/sales/invoices/${invoice.id}` ? 'bg-gray-100' : '')}
				>
					<div class="flex justify-between text-[length:14px] font-bold leading-6">
						<div>{invoice.name}</div>
						<div>{currencyFormatter.format(invoice.totalAmount)}</div>
					</div>
					<div class="flex justify-between text-[length:12px] font-medium leading-4 text-gray-400">
						<div>{invoice.number}</div>
						<div
							class={'uppercase' +
								' ' +
								(invoice.dueStatus === 'paid'
									? 'text-green-brand'
									: invoice.dueStatus === 'overdue'
									? 'text-red-brand'
									: '')}
						>
							{invoice.dueStatusDisplay}
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
	<div class="w-1/2">
		<slot />
	</div>
</div>
