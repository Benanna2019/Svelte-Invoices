<script lang="ts">
	import type { LayoutServerData } from './$types.js';
	import FilePlusIcon from '../../../components/file-plus-icon.svelte';

	import { page } from '$app/stores';

	const newCustomerMatches = $page.url.pathname === '/sales/customers/new';

	export let data: LayoutServerData;
	const { customers } = data;
</script>

<div class="flex overflow-hidden rounded-lg border border-gray-100">
	<div class="w-1/2 border-r border-gray-100">
		<a
			href="/sales/customers/new"
			class="block border-b-4 border-gray-100 py-3 px-4 hover:bg-gray-50 + {newCustomerMatches
				? 'bg-gray-100'
				: ''}"
		>
			<span class="flex gap-1">
				<FilePlusIcon /> <span>Create new customer</span>
			</span>
		</a>
		<div class="max-h-96 overflow-y-scroll">
			{#each customers as customer}
				<a
					href="/sales/customers/{customer.id}"
					class="block border-b border-gray-50 py-3 px-4 hover:bg-gray-50 + {newCustomerMatches
						? 'bg-gray-100'
						: ''}"
				>
					<div class="flex justify-between text-[length:14px] font-bold leading-6">
						<div>{customer.name}</div>
					</div>
					<div class="flex justify-between text-[length:12px] font-medium leading-4 text-gray-400">
						<div>{customer.email}</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
	<div class="flex w-1/2 flex-col justify-between">
		<slot />
		<small class="p-2 text-center">
			Note: this is arbitrarily slow to demonstrate pending UI.
		</small>
	</div>
</div>

<!-- {loadingCustomer && showSkeleton ? (
    <CustomerSkeleton
      name={loadingCustomer.name}
      email={loadingCustomer.email}
    />
} -->
