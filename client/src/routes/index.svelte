<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { getEvents } from '$lib/eventService'

  export const load: Load = async ({ fetch }) => {
    const [data, status] = await getEvents(fetch)
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
  import Searchbar from './_Searchbar.svelte'

  export let events: VenueEvent[]

  $: filteredEvents = events.filter(event =>
    event.name.trim().toLowerCase().includes(
      search.trim().toLowerCase()
    )
  )

  let search = ''
</script>

<Searchbar bind:search={search} />
{#each filteredEvents as event}
  <EventCard {event} />
{:else}
  {#if search}
    <p>No results found</p>
  {:else}
    <p>No events found</p>
  {/if}
{/each}
