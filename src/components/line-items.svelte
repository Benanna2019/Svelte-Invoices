<script lang="ts">
	import LineItemFormFields from './line-item-form-fields.svelte';
	import PlusIcon from './plus-icon.svelte';

	export let error:
		| Record<string, { quantity: string | null; unitPrice: string | null }>
		| undefined;

	let errorValues: { quantity: string | null; unitPrice: string | null };

	if (error) {
		errorValues = Object.values(error).pop() as {
			quantity: string | null;
			unitPrice: string | null;
		};
	}

	const generateRandomId = () => Math.random().toString(32).slice(2);

	const firstId = generateRandomId();

	$: lineItems = [firstId];

	const addField = () => {
		lineItems = [...lineItems, generateRandomId()];
	};

	const removeField = () => {
		lineItems = lineItems.slice(0, lineItems.length - 1);
	};
</script>

<div class="flex flex-col gap-2">
	{#each lineItems as lineItemClientId, index}
		<LineItemFormFields {lineItemClientId} {index} {removeField} {errorValues} />
	{/each}

	<div class="mt-3 text-right">
		<button title="Add Line Item" type="button" on:click={() => addField()}>
			<PlusIcon />
		</button>
	</div>
</div>
