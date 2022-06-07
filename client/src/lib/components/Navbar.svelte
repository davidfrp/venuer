<script lang="ts">
  import { session } from '$app/stores'
  import { logout } from '$lib/authService'
  import Searchbar from './Searchbar.svelte'
</script>

<nav class="fixed z-10 w-full h-20 flex items-center justify-between px-4 border-b bg-white">
  <div class="flex-1">
    <a sveltekit:prefetch href="/" class="px-3 py-2 bg-green-500 bg-opacity-10">Venuer</a>
  </div>
  <Searchbar />
  <div class="flex-1 flex justify-end">
    {#if $session.user}
      <a href="/account-settings" class="px-3 py-2 bg-green-500 bg-opacity-10">Your account</a>
      <button on:click={logout} class="px-3 py-2 bg-green-500 bg-opacity-10">Log out</button>
    {:else}
      <a href="/login" class="px-3 py-2 bg-green-500 bg-opacity-10">Log in</a>
      <a href="/register" class="px-3 py-2 bg-green-500 bg-opacity-10">Sign up</a>
    {/if}
  </div>
</nav>
