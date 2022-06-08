<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
  import Button from '$lib/components/Button.svelte'
  import { deleteVenue } from '$lib/venueService'
  import { invalidate } from '$app/navigation'
  import { page } from '$app/stores'

  export let onDeleted: () => void
  export let venue: Venue

  let focusRef: HTMLInputElement
  let confirmationText: string

  $: if (focusRef) {
    focusRef.focus()
  }

  const handleSubmit = async () => {
    if (confirmationText === venue.name) {
      await deleteVenue(venue.slug)
      await invalidate('/' + $page.routeId)
      onDeleted()
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <p>This venue will be deleted, along with all its events, orders, and settings. This will impact all current and past events. This action is irreversibel and <span class="font-bold">cannot be undone</span>.</p>
  <TextInput id="confirmationText" bind:inputRef={focusRef} bind:value={confirmationText} label="To verify, type &quot;{venue.name}&quot; below:" />
  <Button isDisabled={confirmationText !== venue.name} variant="contained" size="lg">Delete {venue.name}</Button>
</form>