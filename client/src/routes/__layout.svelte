<script>
  import '../app.css'
  import { session } from '$app/stores'
  import { logout } from '$lib/authService'
</script>

<nav class="h-20 bg-green-500 flex items-center justify-end space-x-4 pr-4">
  <a href="/" class="px-3 py-2 bg-pink-500 mr-auto ml-4">Home</a>
  {#if $session.user}
    <a href="/profile" class="px-3 py-2 bg-pink-500">My Profile</a>
    <a href="/" on:click={logout} class="px-3 py-2 bg-pink-500">Log out</a>
  {:else}
    <a href="/login" class="px-3 py-2 bg-pink-500">Log in</a>
    <a href="/register" class="px-3 py-2 bg-pink-500">Sign up</a>
  {/if}
</nav>

<main class="mx-auto max-w-lg p-6">
  <slot />
</main>
