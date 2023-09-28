<script>
	import { page } from '$app/stores';
	const indexMatches = $page.url.pathname === '/sales';
	const invoiceMatches = $page.url.pathname.includes('/sales/invoices');
	const customerMatches = $page.url.pathname.includes('/sales/customers');
</script>

<div class="relative h-full p-10">
	<h1 class="font-display text-d-h3 text-black">Sales</h1>
	<div class="h-6" />
	<div
		class="flex gap-4 border-b border-gray-100 pb-4 text-[length:14px] font-medium text-gray-400"
	>
		<a href="/sales" class={indexMatches ? 'font-bold text-black' : ''}> Overview </a>
		<a href="/sales/subscriptions"> Subscriptions </a>

		<a href="/sales/invoices" class={invoiceMatches ? 'font-bold text-black' : ''}> Invoices </a>

		<a href="/sales/customers" class={customerMatches ? 'font-bold text-black' : ''}> Customers </a>
		<a href="/sales/deposits"> Deposits </a>
	</div>
	<div class="h-4" />
	<slot />
</div>
