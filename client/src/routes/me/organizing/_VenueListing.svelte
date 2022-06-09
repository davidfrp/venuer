<script lang="ts">
  import Button from '$lib/components/Button.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import SaveVenueForm from './_SaveVenueForm.svelte'
  import DeleteVenueForm from './_DeleteVenueForm.svelte'

  export let venue: Venue

  let isSavingModalShown = false
  let isDeletingModalShown = false
</script>

<div class="self-start flex gap-3 items-center w-full py-6">
  <span class="truncate font-semibold">{venue.name}</span>
  <a class="flex-1" href="/{venue.slug}">Go to venue page</a>
  <Button variant="text" on:click={() => isSavingModalShown = true}>Edit</Button>
  <Button variant="text" on:click={() => isDeletingModalShown = true}>Delete</Button>
</div>

<Modal title="Edit venue" isOpen={isSavingModalShown} onRequestClose={() => isSavingModalShown = false}>
  <SaveVenueForm {venue} onSaved={() => isSavingModalShown = false} />
</Modal>

<Modal title="Delete venue" isOpen={isDeletingModalShown} onRequestClose={() => isDeletingModalShown = false}>
  <DeleteVenueForm {venue} onDeleted={() => isDeletingModalShown = false} />
</Modal>
