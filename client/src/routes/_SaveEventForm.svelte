<script lang="ts">
  import DropdownSelection from '$lib/components/DropdownSelection.svelte'
  import TextInput from '$lib/components/TextInput.svelte'
  import Calendar from '$lib/components/Calendar.svelte'
  import Button from '$lib/components/Button.svelte'
  import Alert from '$lib/components/Alert.svelte'
  import { saveEvent } from '$lib/eventService'

  export let onSaved: () => void
  export let venues: Venue[] | undefined = undefined
  export let event: VenueEvent | undefined = undefined

  let tempEvent: VenueEvent = structuredClone(event) ?? {} as VenueEvent

  $: if (tempEvent.venue && !tempEvent.venue.halls.find(h => h._id === tempEvent.hall)) {
    tempEvent.hall = tempEvent.venue.halls[0]._id as string
  }

  let errorMessage: string
  let isSaving: boolean

  const handleSubmit = async () => {
    isSaving = true

    const slug = event?.slug
    const { venue, hall, name, externalUrl, description, imageUrl, videoId, startsAt, endsAt } = tempEvent
    const [data, status] = await saveEvent({
      slug,
      venue,
      hall,
      name,
      externalUrl,
      description,
      imageUrl,
      videoId,
      startsAt,
      endsAt
    })

    if (status === 'success') {
      event = data as VenueEvent
      onSaved()
    } else {
      errorMessage = (data as Record<string, unknown>).message as string
    }

    isSaving = false
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  {#if errorMessage}
    <Alert title="Your event could not be saved" message={errorMessage} />
  {/if}
  {#if venues}
    <DropdownSelection id="venue" label="Venue" bind:value={tempEvent.venue}>
      {#each venues.filter(v => v.halls.length > 0) as venue}
        <option value={venue}>{venue.name}</option>
      {/each}
    </DropdownSelection>
  {/if}
  {#if tempEvent.venue}
    <DropdownSelection id="hall" label="Hall" bind:value={tempEvent.hall}>
      {#each tempEvent.venue.halls as hall (hall)}
        <option value={hall._id}>{hall.name}</option>
      {/each}
    </DropdownSelection>
  {/if}
  <TextInput isRequired id="name" bind:value={tempEvent.name} label="Name" />
  <TextInput isRequired isMultiline id="description" bind:value={tempEvent.description} label="Description" />
  <TextInput isRequired id="imageUrl" bind:value={tempEvent.imageUrl} label="Image url" />
  <TextInput id="externalUrl" bind:value={tempEvent.externalUrl} label="Ticketing url" />
  <TextInput id="videoId" bind:value={tempEvent.videoId} label="Video id" />
  <Calendar
    bind:startDate={tempEvent.startsAt}
    bind:endDate={tempEvent.endsAt}
    allowPickingTimeOfDay
    allowOnlyFutureDates
  />
  <Button isLoading={isSaving} variant="contained" size="lg">Save event</Button>
</form>