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
  import IconButton from '$lib/components/IconButton.svelte'
  import Button from '$lib/components/Button.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import SaveVenueForm from './_SaveVenueForm.svelte'
  import DeleteVenueForm from './_DeleteVenueForm.svelte'

  export let venues: Venue[]

  let isSavingVenue: boolean
  let isDeletingVenue: boolean
  
  let venueToModify: Venue | undefined

  // Once modals are closed, reset venueToModify to undefined.
  $: venueToModify = isSavingVenue || isDeletingVenue ? venueToModify : undefined
</script>

<div class="flex flex-col gap-6 items-center pt-6">
  <div class="w-full divide-y">
    {#each venues as venue}
      <div class="self-start flex gap-3 items-center w-full py-6">
        <span class="truncate font-semibold text-lg">{venue.name}</span>
        <a class="flex-1" href="/{venue.slug}">Go to venue page</a>
        <Button
          on:click={() => {
            venueToModify = venue
            isSavingVenue = true
          }}
          variant="text"
        >Edit</Button>
        <Button
          variant="text"
          on:click={() => {
            venueToModify = venue
            isDeletingVenue = true
          }}
        >Delete</Button>
      </div>
    {:else}
      <p class="text-center">You don't organize any venues, yet</p>
    {/each}
  </div>
  <IconButton text="Create a venue" on:click={() => isSavingVenue = true}>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  </IconButton>
</div>

<Modal
  title={venueToModify ? 'Edit venue' : 'Create a venue'}
  onRequestClose={() => isSavingVenue = false}
  isOpen={isSavingVenue}
>
  <SaveVenueForm venue={venueToModify} onSaved={() => isSavingVenue = false} />
</Modal>

{#if venueToModify}
   <Modal title="Delete venue" isOpen={isDeletingVenue} onRequestClose={() => isDeletingVenue = false}>
     <DeleteVenueForm venue={venueToModify} onDeleted={() => isDeletingVenue = false} />
   </Modal>
{/if}
