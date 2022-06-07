<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { get } from '$lib/api'

  export const load: Load = async ({ fetch, url }) => {
    const [data, status] = await get(`/events?${url.searchParams.toString()}`, fetch as any)
    if (status === 'success') {
      return {
        status: 200,
        props: {
          events: data
        }
      }
    }

    return { status: 500 }
  }
</script>

<script lang="ts">
  import EventCard from './_EventCard.svelte'
  export let events: VenueEvent[]

  // $: filteredEvents = events.filter(event =>
  //   event.name.trim().toLowerCase().includes(
  //     search.trim().toLowerCase()
  //   )
  // )

  // let search = '' // FIXME Remove unused code
</script>

<svelte:head>
  <title>Venuer - Find an event!</title>
  <meta name="description" content="" />
  <meta property="og:title" content="" />
  <meta property="og:description" content="" />  
  <meta property="og:image" content="" />
</svelte:head>

<div class="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {#each events as event}
    <EventCard {event} />
  {:else}
    <h2 class="text-xl">No exact matches</h2>
  {/each}
</div>
