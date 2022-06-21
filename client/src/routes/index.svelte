<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { getVenuesByMe } from '$lib/venueService'
  import { get } from '$lib/api'

  export const load: Load = async ({ fetch, url, session }) => {
    const [events, status] = await get(`/events?${url.searchParams.toString()}`, fetch as any)
    if (status === 'success') {

      let myVenues: Venue[] | undefined
      if (session.user && session.user.role > 0) {
        const [venues, status] = await getVenuesByMe(fetch as any)
        if (status === 'success') {
          myVenues = venues as any
        }
      }

      return {
        status: 200,
        props: {
          events,
          myVenues
        }
      }
    }

    return { status: 302, redirect: '/' }
  }
</script>

<script lang="ts">
  import Button from '$lib/components/Button.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import SaveEventForm from './_SaveEventForm.svelte'
  import EventCard from './_EventCard.svelte'

  export let events: VenueEvent[]
  export let myVenues: Venue[] | undefined

  let isSavingModalShown: boolean
</script>

<!-- TODO fill out meta tags for '/' -->
<svelte:head>
  <title>Find an event - Venuer</title>
  <meta name="description" content="" />
  <meta property="og:title" content="" />
  <meta property="og:description" content="" />  
  <meta property="og:image" content="" />
</svelte:head>

<div class="mb-6 sm:mb-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {#each events as event}
    <EventCard {event} />
  {:else}
    <h2 class="text-xl">No exact matches</h2>
  {/each}
</div>

<!-- TODO Only show future events by default. -->

{#if myVenues}
  <div class="fixed bottom-6 left-6 right-6 sm:right-auto sm:bottom-10 sm:left-1/2 sm:-translate-x-1/2">
    <Button on:click={() => isSavingModalShown = true} variant="contained" size="md" isFloating>
      <div class="flex items-center gap-3">
        Create a new event
        <div class="w-5 h-5 text-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2.75} stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8M16 2v4M8 2v4M3 10h18M19 16v6M16 19h6"/>
          </svg>
        </div>
      </div>
    </Button>
  </div>
  {#if myVenues.filter(v => v.halls.length > 0).length > 0}
    <Modal title="Create an event" isOpen={isSavingModalShown} onRequestClose={() => isSavingModalShown = false}>
      <SaveEventForm venues={myVenues} onSaved={() => isSavingModalShown = false} />
    </Modal>
  {:else}
    <Modal title="Event cannot be created" isOpen={isSavingModalShown} onRequestClose={() => isSavingModalShown = false}>
      <div class="space-y-3">
        <p>No suitable venue for an event was found. This might be because you haven't created any venues yet, or because you haven't created any halls to host events in, for your venues.</p>
        <p>You can organize your venues from <a sveltekit:prefetch href="/me/organizing">your account's page</a>.</p>
      </div>
    </Modal>
  {/if}
{/if}
