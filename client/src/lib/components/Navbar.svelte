<script lang="ts">
  import { session } from '$app/stores'
  import { logout } from '$lib/authService'
  import Searchbar from './Searchbar.svelte'
</script>

<nav class="fixed top-0 z-10 w-full py-3 flex flex-wrap gap-3 items-center justify-between px-6 lg:px-[var(--page-px)] border-b bg-white">
  <div class="flex-1 text-xl lowercase font-bold text-brand order-1">
    <a sveltekit:prefetch href="/" class="no-base px-3 py-2 -ml-3">Venuer</a>
  </div>
  <div class="flex-1 justify-center basis-full order-3 lg:basis-16 md:order-2 md:max-w-sm">
    <Searchbar />
  </div>
  <div class="flex-1 flex justify-end whitespace-nowrap -mr-3 order-2 md:order-3 font-medium">
    {#if $session.user}
      <a href="/me" class="no-base px-3 py-2 hover:underline">Your account</a>
      <button on:click={logout} class="px-3 py-2 hover:underline font-medium">Log out</button>
    {:else}
      <a href="/login" class="no-base px-3 py-2 hover:underline">Log in</a>
      <a href="/register" class="no-base px-3 py-2 hover:underline">Sign up</a>
    {/if}
  </div>
</nav>
