<script lang="ts">
	import FakebooksLogo from './fakebooks-logo.svelte';
	export let size: 'sm' | 'lg' = 'sm';
	export let position: 'left' | 'center' = 'left';
	const [logoSize, textSize] = {
		sm: [`h-4 w-4`, `text-d-p-sm`],
		lg: [`h-12 w-12`, `text-d-h2`]
	}[size];
</script>

<div
	class={`flex items-center ${position === 'center' ? 'justify-center' : ''} text-[color:#23BF1F]`}
>
	<FakebooksLogo className={`relative top-[1px] ${logoSize}`} />
	<div class="w-1" />
	<div class={`font-display ${textSize}`}>Fakebooks</div>
</div>
