<script lang="ts">
	import { currencyFormatter, lineItemClassName } from '$lib';

	export let description: string, unitPrice: number, quantity: number;
</script>

<div class={lineItemClassName}>
	<div>{description}</div>

	<!-- if quantity equals one don't display else display -->

	{#if quantity === 1}
		<div />
	{:else}
		<div class="text-[10px]">({quantity}x)</div>
	{/if}

	<div>{currencyFormatter.format(unitPrice)}</div>
</div>
