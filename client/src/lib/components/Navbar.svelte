<script lang="ts">
  import { session } from '$app/stores'
  import { logout } from '$lib/authService'
  import Searchbar from './Searchbar.svelte'
</script>

<nav class="fixed z-10 w-full h-20 flex items-center justify-between px-4 border-b bg-white">
  <div class="flex-1">
    <a sveltekit:prefetch href="/" class="no-base px-3 py-2 hover:underline">Venuer</a>
  </div>
  <Searchbar />
  <div class="flex-1 flex justify-end">
    {#if $session.user}
      <a href="/me" class="no-base px-3 py-2 hover:underline">Your account</a>
      <button on:click={logout} class="px-3 py-2 hover:underline">Log out</button>
    {:else}
      <a href="/login" class="no-base px-3 py-2 hover:underline">Log in</a>
      <a href="/register" class="no-base px-3 py-2 hover:underline">Sign up</a>
    {/if}
  </div>
</nav>
