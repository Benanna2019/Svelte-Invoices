<script lang="ts">
	export let message: string;
</script>

<div class="absolute inset-0 flex justify-center bg-red-100 pt-4">
	<div class="text-red-brand text-center">
		<div class="text-[14px] font-bold">Oh snap!</div>
		<div class="px-2 text-[12px]">{message}</div>
	</div>
</div>
