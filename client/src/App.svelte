<script lang="ts">
	export let name: string;
</script>

<main class="text-center p-4 mx-auto max-w-xs sm:max-w-none">
	<h1 class="my-10 uppercase text-[#ff3e00] text-6xl font-thin">Hello {name}!</h1>
	<p class="my-4">Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>