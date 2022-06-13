<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { getVenuesByMe } from '$lib/venueService'

  export const load: Load = async ({ fetch }) => {
    const [venues] = await getVenuesByMe(fetch as any)
    return {
      props: {
        venues
      }
    }
  }
</script>

<script lang="ts">
  import VenueListing from './_VenueListing.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import SaveVenueForm from './_SaveVenueForm.svelte'

  export let venues: Venue[]

  let isSavingModalShown: boolean
</script>

<div class="flex flex-col gap-6 items-center pt-6">
  <div class="w-full divide-y">
    {#each venues as venue}
      <VenueListing {venue} />
    {:else}
      <p class="text-center">You don't organize any venues, yet</p>
    {/each}
  </div>
  <IconButton text="Create a venue" on:click={() => isSavingModalShown = true} variant="brand">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  </IconButton>
</div>

<Modal title="Create a venue" isOpen={isSavingModalShown} onRequestClose={() => isSavingModalShown = false}>
  <SaveVenueForm onSaved={() => isSavingModalShown = false} />
</Modal>
