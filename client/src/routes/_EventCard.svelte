<script lang="ts">
  export let event: VenueEvent
</script>

<div>
  <a href="/{event.venue.slug}/{event.slug}">
    {event.name}
  </a>
</div>