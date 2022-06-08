<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { NotFoundError } from '$lib/errors'
  import { getEventBySlug } from '$lib/eventService'

  export const load: Load = async ({ params, fetch }) => {
    const [event, status] = await getEventBySlug(params.slug, fetch as any)
    if (status === 'success') {
      return {
        status: 200,
        props: {
          event
        }
      }
    }

    return { status: 404, error: new NotFoundError() }
  }
</script>

<script lang="ts">
  import dayjs from 'dayjs'
  import { session } from '$app/stores'
  export let event: VenueEvent
</script>

<svelte:head>
  <title>Venuer - {event.name}</title>
  <meta name="description" content={event.description} />
  <meta property="og:title" content="{event.name} live at 
    {event.venue.name}, {event.venue.location.city} the 
    {dayjs(event.startsAt).format('MMMM D, YYYY [at] H:mm')}"
  />
  <meta property="og:description" content={event.description} />
  <meta property="og:image" content={event.imageUrl} />
</svelte:head>

<div>
  <div class="h-[50vh] rounded-xl overflow-hidden">
    <img class="h-full w-full object-cover" src={event.imageUrl} alt="">
  </div>
  {#if $session.user}
    <a sveltekit:prefetch href="/{event.venue.slug}/{event.slug}/tickets" class="no-base p-4 rounded-lg my-3 block text-white bg-pink-600">Buy tickets</a>
  {:else}
    <a href="/login?redirectTo=/{event.venue.slug}/{event.slug}/tickets" class="no-base p-4 rounded-lg my-3 block text-white bg-pink-600">Log in to buy tickets</a>
  {/if}
  <h1>{event.hall.name}</h1>
  <h1>{event.name}</h1>
  <h2>{event.startsAt}</h2>
  <p class="whitespace-pre-wrap text-gray-600">
    {event.description}
  </p>
  <iframe
    class="aspect-video w-full max-w-2xl"
    src="http://www.youtube.com/embed/{event.videoId}"
    allowfullscreen
    frameborder={1}
    title=""
  />
  <p class="whitespace-pre-wrap">{JSON.stringify(event, null, 2)}</p>  
</div>