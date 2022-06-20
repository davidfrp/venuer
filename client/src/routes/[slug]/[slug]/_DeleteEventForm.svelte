<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
  import Button from '$lib/components/Button.svelte'
  import { deleteEvent } from '$lib/eventService'

  export let onDeleted: () => void
  export let event: VenueEvent | undefined

  let confirmationText: string
  let isDeleting: boolean

  const handleSubmit = async () => {
    isDeleting = true

    await deleteEvent(event!.slug)

    isDeleting = false

    onDeleted()
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <p>This event will be deleted. This action is irreversibel and <span class="font-bold">cannot be undone</span>.</p>
  <TextInput id="confirmationText" bind:value={confirmationText} label="To verify, type &quot;{event?.name}&quot; below:" />
  <Button isLoading={isDeleting} isDisabled={confirmationText !== event?.name} variant="contained" size="lg">Delete {event?.name}</Button>
</form>