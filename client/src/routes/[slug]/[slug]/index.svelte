<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { NotFoundError } from '$lib/errors'
  import { getEventBySlug } from '$lib/eventService'

  export const load: Load = async ({ params, fetch }) => {
    const [event, status] = await getEventBySlug(params.slug, fetch as any)
    if (status === "success") {
      return {
        status: 200,
        props: {
          event,
        },
      }
    }

    return { status: 404, error: new NotFoundError() }
  }
</script>

<script lang="ts">
  import Button from '$lib/components/Button.svelte'
  import SaveEventForm from '../../_SaveEventForm.svelte'
  import DeleteEventForm from './_DeleteEventForm.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'
  import dayjs from 'dayjs'

  export let event: VenueEvent

  let isVenueInfoModalShown: boolean
  let isSavingModalShown: boolean
  let isDeletingModalShown: boolean

  $: hall = event.venue.halls.find((hall) => hall._id === event.hall)

  $: isLoggedIn = !!$session.user
  $: isOrganizer = isLoggedIn && event.venue.organizer === $session.user!._id

  const handleDeleted = async () => {
    await goto('/')
    isDeletingModalShown = false
  }
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
  <div class="flex flex-col sm:flex-row sm:items-center">
    <div class="flex-1 min-w-0 flex flex-col">
      <h1 class="truncate text-2xl font-semibold">{event.name}</h1>
      <div class="flex gap-3">
        <h2 class="truncate text-gray-500">{event.venue.name} — {hall?.name}</h2>
        <button on:click={() => (isVenueInfoModalShown = true)} class="whitespace-nowrap text-brand hover:underline">
          More info
        </button>
      </div>
    </div>
    {#if isOrganizer}
      <div class="flex justify-end">
        <Button on:click={() => isSavingModalShown = true} variant="text">
          Edit
        </Button>
        <Button on:click={() => isDeletingModalShown = true} variant="text">
          Delete
        </Button>
      </div>
    {/if}
  </div>
  <a
    sveltekit:prefetch
    href={(isLoggedIn ? event.externalUrl : `/login?redirectTo=${event.venue.slug}/${event.slug}`)}
    class="no-base block"
  >
    <Button variant="contained" size="lg">
      {isLoggedIn ? 'Buy tickets' : 'Login to buy tickets'}
    </Button>
  </a>
  <p class="whitespace-pre-wrap">
    {event.description}
  </p>
  {#if event.videoId}
    <iframe
      class="aspect-video w-full max-w-2xl"
      src="http://www.youtube.com/embed/{event.videoId}"
      allowfullscreen
      frameborder={1}
      title=""
    />
  {/if}
</div>

<Modal isOpen={isSavingModalShown} onRequestClose={() => isSavingModalShown = false} title="Edit event">
  <SaveEventForm bind:event onSaved={() => isSavingModalShown = false} />
</Modal>

<Modal isOpen={isDeletingModalShown} onRequestClose={() => isDeletingModalShown = false} title="Delete event">
  <DeleteEventForm {event} onDeleted={handleDeleted} />
</Modal>

<Modal
  isOpen={isVenueInfoModalShown}
  onRequestClose={() => (isVenueInfoModalShown = false)}
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
