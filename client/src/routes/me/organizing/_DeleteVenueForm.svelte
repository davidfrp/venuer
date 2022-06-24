<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
  import Button from '$lib/components/Button.svelte'
  import { deleteVenue } from '$lib/venueService'

  export let onDeleted: () => void
  export let venue: Venue | undefined

  let confirmationText: string
  let isDeleting: boolean

  const handleSubmit = async () => {
    isDeleting = true

    await deleteVenue(venue!.slug)

    isDeleting = false

    onDeleted()
  }
</script>

<form on:submit|preventDefault={null} class="space-y-6">
  <div class="space-y-3">
    <p>This venue will be deleted, along with all its events, orders, and settings. This will impact all current and past events.</p>
    <p>This action is irreversibel and <span class="font-bold">cannot be undone</span>.</p>
  </div>
  <TextInput id="confirmationText" bind:value={confirmationText} label="To verify, type &quot;{venue?.name}&quot; below:" />
  <Button
    isDisabled={confirmationText !== venue?.name}
    on:click={handleSubmit}
    isLoading={isDeleting}
    variant="contained"
    type="button"
    size="lg"
  >
    Delete {venue?.name}
  </Button>
</form>