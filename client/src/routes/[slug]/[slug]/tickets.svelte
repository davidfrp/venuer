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
  import SeatSelector from './_SeatSelector.svelte'

  export let event: VenueEvent

  $: seats = <Seat[]>[] // event.hall.seats
  let selectedSeats: Seat[]
</script>

<pre>{JSON.stringify(event, null, 2)}</pre>


<a sveltekit:prefetch href="/{event.venue.slug}/{event.slug}">Go back to event</a> <!-- TODO consider the wording a bit here, ppl might navigate to this page directly without having come from the event's page. -->
<h1>{event.name} in {event.venue.location.city}, {event.venue.name}</h1>
<time datetime={event.startsAt}>{event.startsAt}</time>
<div class="flex gap-6 pt-6 bg-teal-200">
  <div class="flex-1 bg-slate-100">
    <SeatSelector {seats} bind:selectedSeats={selectedSeats} title={event.hall.name} />
  </div>
  <div class="flex-1 bg-slate-100">
    <!--
      <form on:submit|preventDefault={() => {}}></form>
      <ContactInfo />
      <PurchaseForm />
      <DeliveryForm />
      <PaymentForm />
      <ReservationForm />
      <BookingForm /> <-- use this one
      <TicketForm />
      <OrderForm />
    -->
  </div>
  <!-- TODO Floating action button? -->
</div>