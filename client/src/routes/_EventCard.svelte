<script lang="ts">
  import { session } from '$app/stores'
  import dayjs from 'dayjs'

  export let event: VenueEvent
</script>

<a sveltekit:prefetch href="/{event.venue.slug}/{event.slug}" class="no-base">
  <div class="relative aspect-[20/19] rounded-xl overflow-hidden bg-gray-100">
    <img src={event.imageUrl} alt="" class="w-full h-full object-cover">
  </div>
  <div class="py-3">
    {#if event.venue.organizer === $session.user?._id}
      <span class="px-2 py-0.5 mb-1 inline-block rounded-full 
        whitespace-nowrap bg-brand bg-opacity-10 text-brand 
        text-xs font-semibold uppercase tracking-wide"
      >
        Your event
      </span>
    {/if}
    <h1 class="text-lg font-semibold truncate">{event.name}</h1>
    <div class="text-sm text-gray-500">
      {event.venue.location.city}, {event.venue.name}
    </div>
    <div class="text-sm text-gray-500">
      <time datetime={event.startsAt}>
        {dayjs(event.startsAt).format('dddd MMM D ')}
      </time>
      <time datetime={event.startsAt}>
        {dayjs(event.startsAt).format(' — H:mm')}
      </time>
    </div>
  </div>
</a>
