<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
  import Button from '$lib/components/Button.svelte'
  import Alert from '$lib/components/Alert.svelte'
  import HallListing from './_HallListing.svelte'
  import { saveVenue } from '$lib/venueService'

  export let onSaved: (venue: Venue) => void
  export let venue: Venue | undefined = undefined
  
  let tempVenue: Venue

  const populate = () => {
    tempVenue = structuredClone(venue) ?? { location: {}, halls: [] } as any
  }

  $: venue, populate()

  let errorMessage: string
  let isSaving: boolean

  const handleSubmit = async () => {
    isSaving = true
    const slug = venue?.slug
    const { name, description, location, halls } = tempVenue ?? {}
    const [data, status] = await saveVenue({ slug, name, description, location, halls })
    isSaving = false
    if (status === 'success') {
      onSaved(data as Venue)
    } else {
      errorMessage = data.message as string
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  {#if errorMessage}
    <Alert title="Your venue could not be saved" message={errorMessage} />
  {/if}
  <!-- TODO Set required fields to be required, x-check with Joi- and model schema -->
  <div class="space-y-3">
    <h2 class="text-lg font-semibold">General details</h2>
    <div class="space-y-6">
      <TextInput id="name" isRequired bind:value={tempVenue.name} label="Name" placeholder="PRYZM, Classical Hall, etc." />
      <TextInput id="description" bind:value={tempVenue.description} label="Description" />
    </div>
  </div>
  <div class="space-y-3">
    <h2 class="text-lg font-semibold">Location</h2>
    <div class="space-y-6">
      <TextInput id="country" bind:value={tempVenue.location.country} label="Country" placeholder="Farawayistan" />
      <TextInput id="city" bind:value={tempVenue.location.city} label="City" placeholder="Anytown" />
      <TextInput id="postalCode" bind:value={tempVenue.location.postalCode} label="Postal code" placeholder="1337" />
      <TextInput id="address" bind:value={tempVenue.location.address} label="Street name and number" placeholder="Someville Avenue 42" />
      <TextInput id="additionalInfo" bind:value={tempVenue.location.additionalInfo} label="Additional information" />
    </div>
  </div>
  <div class="space-y-3">
    <h2 class="text-lg font-semibold">Halls</h2>
    {#each tempVenue.halls as hall (hall)}
      <!-- TODO Extract removing halls into a named function instead. -->
      <HallListing name={hall.name} seats={hall.seats.length} onRequestRemoval={() => tempVenue.halls = tempVenue.halls.filter((h) => h !== hall)} />
    {/each}
    <!-- TODO Extract adding halls into a named function instead. -->
    <Button type="button" variant="outlined" size="md" on:click={() => tempVenue.halls = [...tempVenue.halls, { name: 'Unnamed hall', seats: [] }]}>
      Add a hall
    </Button>
  </div>
  <Button isLoading={isSaving} variant="contained" size="lg">Save venue</Button>
</form>