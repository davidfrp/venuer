<script lang="ts">
  import dayjs from 'dayjs'
  export let event: VenueEvent
</script>

<a sveltekit:prefetch href="/{event.venue.slug}/{event.slug}" class="no-base">
  <div class="relative aspect-[20/19] rounded-xl overflow-hidden bg-gray-100">
    <img src={event.imageUrl} alt="" class="w-full h-full object-cover">
  </div>
  <div class="py-3">
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
