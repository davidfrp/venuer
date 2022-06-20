<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { getVenuesByMe } from '$lib/venueService'

  export const load: Load = async ({ fetch }) => {
    const [venues, status] = await getVenuesByMe(fetch as any)
    return {
      props: {
        venues: status === 'success' ? venues : []
      }
    }
  }
</script>

<script lang="ts">
  import VenueListing from './_VenueListing.svelte'
  import Button from '$lib/components/Button.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import SaveVenueForm from './_SaveVenueForm.svelte'

  export let venues: Venue[]

  let isSavingModalShown: boolean

  $: venues = venues.filter(v => v !== undefined)

  const handleAdded = (venue: Venue) => {
    venues = [...venues, venue]
    isSavingModalShown = false
  }
</script>

<div class="space-y-3">
  <h2 class="text-2xl font-semibold">Your venues</h2>
  <div class="divide-y">
    {#each venues as venue}
      <VenueListing bind:venue />
    {:else}
      <p class="text-center my-6">You don't organize any venues, yet</p>
    {/each}
  </div>
  <div class="flex flex-col items-center">
    <Button on:click={() => isSavingModalShown = true} variant="contained" size="md">
      <div class="flex items-center gap-3">
        Create a new venue
        <div class="w-5 h-5 text-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2.75} stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"/>
            <path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2ZM18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z"/>
          </svg>
        </div>
      </div>
    </Button>
  </div>
</div>

<Modal title="Create a venue" isOpen={isSavingModalShown} onRequestClose={() => isSavingModalShown = false}>
  <SaveVenueForm onSaved={handleAdded} />
</Modal>
