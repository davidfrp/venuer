<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { getVenuesByMe } from '$lib/venueService'

  export const load: Load = async ({ fetch }) => {
		const [venues] = await getVenuesByMe(fetch)
    return {
      props: {
        venues
      }
    }
  }
</script>

<script lang="ts">
  import Button from '$lib/components/Button.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import UpdateVenueModal from './_UpdateVenueModal.svelte'

  export let venues: Venue[]

  let shownModalId: string

  const onSavedVenue = (data: Venue) => {
    venues = venues.map(venue =>
      venue._id === data._id ? data : venue
    )
  }

  // TODO Implement delete venue
  const handleDeleteVenue = (data: Venue) => {
    // venues = venues.filter(venue => venue._id !== data._id)
  }
</script>

{#if venues.length === 0}
  <p>No venues found</p>
{:else}
  {#each venues as venue}
    <UpdateVenueModal
      modalProps={{
        title: 'Edit venue',
        isOpen: shownModalId === 'update-venue-modal',
        id: 'update-venue-modal',
        onRequestClose: () => { shownModalId = '' }
      }}
      onSaved={onSavedVenue}
      venue={venue}
    />
    <Modal
      id="delete-venue-modal"
      title="Are you sure you want to delete this venue?"
      isOpen={shownModalId === 'delete-venue-modal'}
      onRequestClose={() => { shownModalId = '' }}
    >
      <Button type="button" on:click={() => handleDeleteVenue(venue)}>
        Delete
      </Button>
    </Modal>
    <div class="flex justify-between">
      <a sveltekit:prefetch href="/venues/{venue.slug}">
        <div class="p-4">
          <h1 class="font-semibold mb-2">{venue.name}</h1>
          <address class="not-italic text-gray-600">
            <div>{venue.description}</div>
            <div>{venue.location.address}</div>
            <div>{venue.location.postalCode} {venue.location.city}</div>
            <div>{venue.location.country}</div>
          </address>
        </div>
      </a>
      <div class="flex w-28">
        <Button variant="text" on:click={() => {
          shownModalId = 'update-venue-modal'
        }}>
          Edit
        </Button>
        <Button variant="text" on:click={() => shownModalId = 'delete-venue-modal'}>
          Delete
        </Button>
      </div>
    </div>
  {/each}
{/if}
