<!-- <script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { NotFoundError } from '$lib/errors'
  import { getVenueBySlug } from '$lib/venueService'

  export const load: Load = async ({ params, fetch }) => {
    const [venue, status] = await getVenueBySlug(params.slug, fetch as any)
    if (status === 'success') {
      return {
        status: 200,
        props: {
          venue
        }
      }
    }

    return { status: 404, error: new NotFoundError() }
  }
</script>

TODO Remove this file

<script lang="ts">
  import SaveEventForm from './_SaveEventForm.svelte'
  import Button from '$lib/components/Button.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { session } from '$app/stores'
  export let venue: Venue
  let isSavingEventShown: boolean
</script>

<svelte:head>
  <title>{venue.name} - Venuer</title>
  <meta name="description" content={venue.description} />
  <meta property="og:title" content="{venue.name}, {venue.location.city}" />
  <meta property="og:description" content={venue.description} />
</svelte:head>

{#if $session.user && $session.user._id === venue.organizer}
  <strong>You are an organizer of this venue</strong>
  <p>To make changes to this venue <a href="/me/organizing">go to your dashboard</a></p>
  <Button variant="text" size="md" on:click={() => isSavingEventShown = true}>
    Add an event
  </Button>
  <Modal isOpen={isSavingEventShown} onRequestClose={() => isSavingEventShown = false} title="Create an event">
    <SaveEventForm {venue} onSaved={() => isSavingEventShown = false} />
  </Modal>
{:else}
  <strong>You are not an organizer of this venue</strong>
{/if} -->
