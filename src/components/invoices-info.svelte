<script>
	import { currencyFormatter } from '$lib';
	import LabelText from './label-text.svelte';
	export let label = '';
	export let amount = 0;
	export let right = false;
</script>

<div class={right ? 'text-right' : ''}>
	<LabelText>{label}</LabelText>
	<div class="text-[length:18px] text-black">
		{currencyFormatter.format(amount)}
	</div>
</div>
