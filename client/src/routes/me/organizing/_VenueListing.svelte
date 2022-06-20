<script lang="ts">
  import Button from '$lib/components/Button.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import SaveVenueForm from './_SaveVenueForm.svelte'
  import DeleteVenueForm from './_DeleteVenueForm.svelte'
  import { slide } from 'svelte/transition'

  export let venue: Venue | undefined

  let isSavingModalShown = false
  let isDeletingModalShown = false

  const handleDeleted = async () => {
    venue = undefined
    isDeletingModalShown = false
  }
</script>

<div class="py-6 flex items-center" transition:slide|local>
  <div class="flex-1 min-w-0 flex flex-col">
    <span class="truncate">{venue?.name}</span>
    <span class="text-sm text-gray-500 truncate">{venue?.location.address}</span>
    <span class="text-sm text-gray-500 truncate">{venue?.location.postalCode} {venue?.location.city}</span>
  </div>
  <Button variant="text" on:click={() => isSavingModalShown = true}>Edit</Button>
  <Button variant="text" on:click={() => isDeletingModalShown = true}>Delete</Button>
</div>

<Modal title="Edit venue" isOpen={isSavingModalShown} onRequestClose={() => isSavingModalShown = false}>
  <SaveVenueForm bind:venue onSaved={() => isSavingModalShown = false} />
</Modal>

<Modal title="Delete venue" isOpen={isDeletingModalShown} onRequestClose={() => isDeletingModalShown = false}>
  <DeleteVenueForm {venue} onDeleted={handleDeleted} />
</Modal>
