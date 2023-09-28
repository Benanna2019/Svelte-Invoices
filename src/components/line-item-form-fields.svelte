<script lang="ts">
	import { inputClasses } from '$lib';

	import LabelText from './label-text.svelte';
	import MinusIcon from './minus-icon.svelte';

	export let errorValues: { quantity: string | null; unitPrice: string | null };

	export let lineItemClientId: string, index: number, removeField: () => void;
</script>

<fieldset class="border-b-2 py-2">
	<div class="flex gap-2">
		<button type="button" title="Remove Line Item" on:click={() => removeField()}>
			<MinusIcon />
		</button>
		<legend>Line Item {index + 1}</legend>
	</div>
	<input value={lineItemClientId} name="lineItemId" type="hidden" />
	<div class="flex flex-col gap-1">
		<div class="flex w-full gap-2">
			<div class="flex-1">
				<div class="flex flex-wrap items-center gap-1">
					<LabelText>
						<label for="quantity-{lineItemClientId}"> Quantity: </label>
					</LabelText>

					{#if errorValues?.quantity}
						<em id="quantity-error" class="text-d-p-xs text-red-600">
							{errorValues.quantity}
						</em>
					{/if}
				</div>
				<input
					id="quantity-{lineItemClientId}"
					name="quantity"
					type="number"
					class={inputClasses}
					aria-invalid={Boolean(errorValues?.quantity) || undefined}
					aria-errormessage={errorValues?.quantity ? 'name-error' : undefined}
				/>
			</div>
			<div class="flex-1">
				<div class="flex flex-wrap items-center gap-1">
					<LabelText>
						<label for="unitPrice-{lineItemClientId}"> Unit Price: </label>
					</LabelText>

					{#if errorValues?.unitPrice}
						<em id="unitPrice-error" class="text-d-p-xs text-red-600">
							{errorValues.unitPrice}
						</em>
					{/if}
				</div>
				<input
					id="unitPrice-{lineItemClientId}"
					name="unitPrice"
					type="number"
					min="1"
					step="any"
					class={inputClasses}
					aria-invalid={Boolean(errorValues?.unitPrice) || undefined}
					aria-errormessage={errorValues?.unitPrice ? 'unitPrice-error' : undefined}
				/>
			</div>
		</div>
		<div>
			<LabelText>
				<label for="description-${lineItemClientId}"> Description: </label>
			</LabelText>
			<input id={`description-${lineItemClientId}`} name="description" class={inputClasses} />
		</div>
	</div>
</fieldset>
