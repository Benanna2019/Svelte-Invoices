<script>
	import FullFakebooksLogo from './logo.svelte';
	import UpRightArrowIcon from './uprightarrowicon.svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<div class="relative flex h-screen rounded-lg bg-white text-gray-600">
	<div class="border-r border-gray-100 bg-gray-50">
		<div class="p-4">
			<div class="flex flex-wrap items-center gap-1">
				<a href="." class="my-1 py-1 px-2 pr-16 text-[length:14px]">
					<FullFakebooksLogo size="sm" position="left" />
				</a>
				<!-- <Spinner visible={showSpinner} />  -->
			</div>
			<div class="h-7" />
			<div class="flex flex-col font-bold text-gray-800">
				<!-- add the below code when I figure out how to make something active in svelte -->

				<!-- activeProps={{
              class: "rounded-md bg-gray-100",
            }} -->
				<a href="/" class="my-1 py-1 px-2 pr-16 text-[length:14px]"> Dashboard </a>
				<!-- <NavItem to="accounts">Accounts</NavItem> -->
				<a href="/sales" class="my-1 py-1 px-2 pr-16 text-[length:14px]"> Sales </a>
				<a
					href="https://github.com/FrontendMasters/advanced-remix"
					class="my-1 flex gap-1 py-1 px-2 pr-16 text-[length:14px]"
				>
					GitHub <UpRightArrowIcon />
				</a>

				{#if $page.data.session}
					<button on:click={() => signOut()}>Sign Out</button>
				{:else}
					<button on:click={() => signIn('github')}>Sign in</button>
				{/if}
			</div>
		</div>
	</div>
	<div class="flex-1">
		<slot />
	</div>
</div>
