<script lang="ts">
  import { slide } from 'svelte/transition'
  
  export let search = ''

  let inputRef: HTMLInputElement | null = null

  const handleClick = () => {
    inputRef?.focus()
    search = ''
  }
</script>

<input
  type="text"
  id="search"
  name="search"
  bind:value={search}
  bind:this={inputRef}
  class="border p-2"
/>
{#if search}
  <div class="flex gap-2" in:slide|local out:slide|local>
    <p>Showing results for "{search}"</p>
    <button class="font-semibold hover:underline" on:click|preventDefault={handleClick}>
      Clear search
    </button>
  </div>
{/if}
