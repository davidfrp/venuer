<script lang="ts">
  import Button from '$lib/components/Button.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import SaveHallForm from './_SaveHallForm.svelte'
  import { slide } from 'svelte/transition'

  export let hall: Venue['halls'][number]
  export let onRequestRemoval: () => void

  let isModalShown: boolean
  let focusRef: HTMLButtonElement

  const handleModalClose = () => {
    isModalShown = false
    focusRef?.focus() // If focus is not restored, the overlay will not close on keydown.
  }
</script>

<div class="flex items-center gap-3" transition:slide>
  <div class="flex flex-col flex-1">
    <h3>{hall.name}</h3>
    <div class="text-sm text-gray-500">Room for {hall.seats.length} people</div>
  </div>
  <Button bind:focusRef on:click={() => isModalShown = true} type="button" variant="text" size="sm">
    Edit
  </Button>
  <IconButton size="sm" on:click={onRequestRemoval} ariaLabel="Remove hall">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={3} stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  </IconButton>
</div>

<Modal title="Edit hall" isOpen={isModalShown} onRequestClose={handleModalClose}>
  <SaveHallForm bind:hall onSaved={handleModalClose} />
</Modal>
