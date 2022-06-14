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

    // TODO use redirect instead of displaying the error.
    // return { status: 302, redirect: '/' }
    return { status: 500, error: JSON.stringify(data) }
  }
</script>

<script lang="ts">
  import EventCard from './_EventCard.svelte'
  export let events: VenueEvent[]
</script>

<!-- TODO fill out meta tags for '/' -->
<svelte:head>
  <title>Find an event - Venuer</title>
  <meta name="description" content="" />
  <meta property="og:title" content="" />
  <meta property="og:description" content="" />  
  <meta property="og:image" content="" />
</svelte:head>

<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {#each events as event}
    <EventCard {event} />
  {:else}
    <h2 class="text-xl">No exact matches</h2>
  {/each}
</div>
