<script lang="ts">
  import { session } from '$app/stores'
  import { logout } from '$lib/authService'
</script>

<nav class="fixed w-full h-20 bg-green-500 bg-opacity-10 flex items-center justify-between space-x-4 px-4">
  <a sveltekit:prefetch href="/" class="px-3 py-2 bg-pink-500">Venuer</a>
  <div>
    {#if $session.user}
      <a href="/profile" class="px-3 py-2 bg-pink-500">My profile</a>
      <button on:click={logout} class="px-3 py-2 bg-pink-500">Log out</button>
    {:else}
      <a href="/login" class="px-3 py-2 bg-pink-500">Log in</a>
      <a href="/register" class="px-3 py-2 bg-pink-500">Sign up</a>
    {/if}
  </div>
</nav>
