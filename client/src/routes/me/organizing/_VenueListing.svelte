<script lang="ts">
  import Button from '$lib/components/Button.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import SaveVenueForm from './_SaveVenueForm.svelte'
  import DeleteVenueForm from './_DeleteVenueForm.svelte'

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

<div class="flex flex-col py-6">
  <div class="self-start flex gap-3 items-center w-full">
    <div class="flex-1 flex flex-col">
      <span class="truncate font-semibold">{venue.name}</span>
      <a href="/{venue.slug}">Go to venue page</a>
    </div>
    <Button variant="text" on:click={() => isSavingModalShown = true}>Edit</Button>
    <Button variant="text" on:click={() => isDeletingModalShown = true}>Delete</Button>
  </div>
</div>

<Modal title="Edit venue" isOpen={isSavingModalShown} onRequestClose={() => isSavingModalShown = false}>
  <SaveVenueForm venue={venue} onSaved={handleSaved} />
</Modal>

<Modal title="Delete venue" isOpen={isDeletingModalShown} onRequestClose={() => isDeletingModalShown = false}>
  <DeleteVenueForm {venue} onDeleted={handleDeleted} />
</Modal>
