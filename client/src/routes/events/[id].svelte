<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { NotFoundError } from '$lib/errors'
  import { getEventById } from '$lib/eventService'

  export const load: Load = async ({ params, fetch }) => {
    const [event, status] = await getEventById(params.id, fetch)
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
  export let event: VenueEvent
</script>

<iframe
  frameborder={0} allowfullscreen
  src="http://www.youtube.com/embed/{event.videoId}?autoplay=0&mute=1"
  class="w-full max-h-screen h-[60vh]"
  title="Video for {event.name}."
/>

<main class="px-[15%] pt-6 space-y-3 bg-blue-200">
  <h1 class="font-semibold text-4xl">{event.name}</h1>
  <p>{event.startsAt}</p>
  <p>{event.endsAt}</p>
  <p>{event.description}</p>
</main>
