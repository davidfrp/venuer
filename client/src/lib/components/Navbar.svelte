<script lang="ts">
  import { session } from '$app/stores'
  import { logout } from '$lib/authService'
  import Searchbar from './Searchbar.svelte'
</script>

<nav class="fixed z-10 w-full py-3 flex flex-wrap items-center justify-between px-6 border-b bg-white">
  <div class="flex-1 hidden md:inline">
    <a sveltekit:prefetch href="/" class="no-base px-3 py-2 hover:underline">Venuer</a>
  </div>
  <Searchbar />
  <div class="flex-1 flex justify-end whitespace-nowrap -mr-3">
    {#if $session.user}
      <a href="/me" class="no-base px-3 py-2 hover:underline">Your account</a>
      <button on:click={logout} class="px-3 py-2 hover:underline">Log out</button>
    {:else}
      <a href="/login" class="no-base px-3 py-2 hover:underline">Log in</a>
      <a href="/register" class="hidden sm:inline no-base px-3 py-2 hover:underline">Sign up</a>
    {/if}
  </div>
</nav>
