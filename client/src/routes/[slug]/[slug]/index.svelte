<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { NotFoundError } from '$lib/errors'
  import { getEventBySlug } from '$lib/eventService'

  export const load: Load = async ({ params, fetch }) => {
    const [event, status] = await getEventBySlug(params.slug, fetch as any);
    if (status === "success") {
      return {
        status: 200,
        props: {
          event,
        },
      };
    }

    return { status: 404, error: new NotFoundError() };
  };
</script>

<script lang="ts">
  import Button from '$lib/components/Button.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { session } from '$app/stores'
  import dayjs from 'dayjs'

  export let event: VenueEvent;

  let isModalShown: boolean;

  $: hall = event.venue.halls.find((hall) => hall._id === event.hall);
</script>

<svelte:head>
  <title>{event.name} - Venuer</title>
  <meta name="description" content={event.description} />
  <meta
    property="og:title"
    content="{event.name} live at 
    {event.venue.name}, {event.venue.location.city} the 
    {dayjs(event.startsAt).format('MMMM D, YYYY [at] H:mm')}"
  />
  <meta property="og:description" content={event.description} />
  <meta property="og:image" content={event.imageUrl} />
</svelte:head>

<div class="space-y-6">
  <div class="h-[50vh] rounded-xl overflow-hidden">
    <img class="h-full w-full object-cover" src={event.imageUrl} alt="" />
  </div>
  <div class="space-y-2">
    <h1 class="text-2xl font-semibold">{event.name}</h1>
    <div class="flex gap-3">
      <h2 class="text-gray-500">{event.venue.name} — {hall?.name}</h2>
      <button on:click={() => (isModalShown = true)} class="text-brand hover:underline">
        More info
      </button>
    </div>
  </div>
  <a
    sveltekit:prefetch
    href={`${$session.user ? "" : "/login?redirectTo="}/${event.venue.slug}/${event.slug}/tickets`}
    class="no-base block"
  >
    <Button variant="contained" size="lg">
      {$session.user ? "Buy tickets" : "Login to buy tickets"}
    </Button>
  </a>
  <p class="whitespace-pre-wrap">
    {event.description}
  </p>
  <!-- TODO Uncomment when ready to test YouTube video -->
  <!-- <iframe
    class="aspect-video w-full max-w-2xl"
    src="http://www.youtube.com/embed/{event.videoId}"
    allowfullscreen
    frameborder={1}
    title=""
  /> -->
  <!-- <code class="whitespace-pre-wrap truncate">{JSON.stringify(event, null, 2)}</code> -->
</div>

<Modal
  isOpen={isModalShown}
  onRequestClose={() => (isModalShown = false)}
  title={event.venue.name}
>
  <div class="space-y-6">
    <div class="space-y-3">
      <h2 class="text-lg font-semibold">Address</h2>
      <div class="flex flex-col">
        <div>{event.venue.location.address}</div>
        <div>{event.venue.location.postalCode} {event.venue.location.city}</div>
        <a
          href="https://google.com/maps?q={event.venue.location.address}, {event.venue.location.postalCode} {event.venue.location.city}"
          class="inline-block mt-2"
          rel="noopener noreferrer"
          target="_blank"
        >
          See map
        </a>
      </div>
    </div>
    <div class="space-y-3">
      <h2 class="text-lg font-semibold">Description</h2>
      <p class="whitespace-pre-wrap">{event.venue.description}</p>
    </div>
  </div>
</Modal>
