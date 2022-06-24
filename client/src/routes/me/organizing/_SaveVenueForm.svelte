<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
  import Button from '$lib/components/Button.svelte'
  import Alert from '$lib/components/Alert.svelte'
  import HallListing from './_HallListing.svelte'
  import { saveVenue } from '$lib/venueService'

  export let onSaved: (venue: Venue) => void
  export let venue: Venue | undefined = undefined
  
  let tempVenue: Venue = structuredClone(venue) ?? { location: {}, halls: [] } as any

  let errorMessage: string
  let isSaving: boolean

  const handleSubmit = async () => {
    isSaving = true

    const slug = venue?.slug
    const { name, description, location, halls } = tempVenue ?? {}
    const [data, status] = await saveVenue({
      slug,
      name,
      description,
      location,
      halls
    })

    if (status === 'success') {
      venue = data as Venue
      onSaved(venue)
    } else {
      errorMessage = (data as Record<string, unknown>).message as string
    }

    isSaving = false
  }

  const handleHallRemoval = (hall: Venue['halls'][number]) => {
    tempVenue.halls = tempVenue.halls.filter(h => h !== hall)
  }

  const handleAddingUnnamedHall = () => {
    tempVenue.halls = [...tempVenue.halls, { name: 'Unnamed hall', seats: [] }]
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  {#if errorMessage}
    <Alert title="Your venue could not be saved" message={errorMessage} />
  {/if}
  <div class="space-y-3">
    <h2 class="text-lg font-semibold">General details</h2>
    <div class="space-y-6">
      <TextInput isRequired id="name" bind:value={tempVenue.name} label="Name" placeholder="PRYZM, Classical Hall, etc." />
      <TextInput isMultiline isRequired id="description" bind:value={tempVenue.description} label="Description" />
    </div>
  </div>
  <div class="space-y-3">
    <h2 class="text-lg font-semibold">Halls</h2>
    {#each tempVenue.halls as hall (hall)}
      <HallListing bind:hall onRequestRemoval={() => handleHallRemoval(hall)} />
    {/each}
    <Button on:click={handleAddingUnnamedHall} variant="outlined" type="button" size="md" isFullWidth>
      Add a hall
    </Button>
  </div>
  <div class="space-y-3">
    <h2 class="text-lg font-semibold">Location</h2>
    <div class="space-y-6">
      <TextInput isRequired id="country" bind:value={tempVenue.location.country} label="Country" placeholder="Farawayistan" />
      <TextInput isRequired id="city" bind:value={tempVenue.location.city} label="City" placeholder="Anytown" />
      <TextInput isRequired id="postalCode" bind:value={tempVenue.location.postalCode} label="Postal code" placeholder="1337" />
      <TextInput isRequired id="address" bind:value={tempVenue.location.address} label="Street name and number" placeholder="Someville Avenue 42" />
      <TextInput isMultiline id="additionalInfo" bind:value={tempVenue.location.additionalInfo} label="Additional information" />
    </div>
  </div>
  <Button isLoading={isSaving} variant="contained" size="lg">Save venue</Button>
</form>