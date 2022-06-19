<script lang="ts">
  import Button from '$lib/components/Button.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import SaveVenueForm from './_SaveVenueForm.svelte'
  import DeleteVenueForm from './_DeleteVenueForm.svelte'
  import { slide } from 'svelte/transition'

  export let venue: Venue
  export let onRequestRemoval: (venue: Venue) => void

  let isSavingModalShown = false
  let isDeletingModalShown = false

  const handleSaved = (savedVenue: Venue) => {
    isSavingModalShown = false
    venue = savedVenue
  }

  const handleDeleted = () => {
    isDeletingModalShown = false
    onRequestRemoval(venue)
  }
</script>

<div class="flex items-center py-6" transition:slide|local>
  <div class="flex-1 flex flex-col min-w-0">
    <span class="truncate">{venue.name}</span>
    <span class="text-sm text-gray-500 truncate">{venue.location.address}</span>
    <span class="text-sm text-gray-500 truncate">{venue.location.postalCode} {venue.location.city}</span>
  </div>
  <Button variant="text" on:click={() => isSavingModalShown = true}>Edit</Button>
  <Button variant="text" on:click={() => isDeletingModalShown = true}>Delete</Button>
</div>

<Modal title="Edit venue" isOpen={isSavingModalShown} onRequestClose={() => isSavingModalShown = false}>
  <SaveVenueForm venue={venue} onSaved={handleSaved} />
</Modal>

<Modal title="Delete venue" isOpen={isDeletingModalShown} onRequestClose={() => isDeletingModalShown = false}>
  <DeleteVenueForm {venue} onDeleted={handleDeleted} />
</Modal>
