<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import Button from '$lib/components/Button.svelte'
  import { slide } from 'svelte/transition'

  export let name: string
  export let seats: number
  export let onRequestRemoval: () => void
</script>

<div class="flex items-center gap-3" transition:slide>
  <div class="flex flex-col flex-1">
    <h3>{name}</h3>
    <div class="text-sm text-gray-500">Room for {seats} people</div>
  </div>
  <Button type="button" variant="text" size="sm" on:click={onRequestRemoval}>
    Edit
  </Button>
  <IconButton size="sm" on:click={onRequestRemoval}>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={3} stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  </IconButton>
</div>
<!-- <div class="flex gap-3 items-center">
  <TextInput id="hallName" bind:value={name} label="Hall name" />
  <div class="mt-8">
    <IconButton size="sm" on:click={onRequestRemoval}>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={3} stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18M6 6l12 12"/>
      </svg>
    </IconButton>
  </div>
</div> -->