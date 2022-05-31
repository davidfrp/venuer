<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { myVenues } from '$lib/userService'

  export const load: Load = async ({ fetch }) => {
		const [venues] = await myVenues(fetch)
    return {
      props: {
        venues
      }
    }
  }
</script>

<script lang="ts">
  import Button from '$lib/components/Button.svelte'
  import UpdateVenueModal from '$lib/components/Modal/UpdateVenueModal.svelte'

  export let venues: Venue[]

  let selectedVenue: Venue
  let isOpen = false

  const onSavedVenue = (data: Venue) => {
    venues = venues.map(venue =>
      venue._id === data._id ? data : venue
    )
  }
</script>

{#if venues.length === 0}
  <p>No venues found</p>
{:else}
  <UpdateVenueModal
    onRequestClose={() => isOpen = false}
    onSaved={onSavedVenue}
    bind:venue={selectedVenue}
    {isOpen}
  />
  {#each venues as venue}
    <div class="flex justify-between">
      <div class="p-4">
        <h1 class="font-semibold mb-2">{venue.name}</h1>
        <address class="not-italic text-gray-600">
          <div>{venue.description}</div>
          <div>{venue.location.address}</div>
          <div>{venue.location.postalCode} {venue.location.city}</div>
          <div>{venue.location.country}</div>
        </address>
      </div>
      <Button variant="text" on:click={() => {
          selectedVenue = venue
          isOpen = true
        }}>
        Edit
      </Button>
    </div>
  {/each}
{/if}
