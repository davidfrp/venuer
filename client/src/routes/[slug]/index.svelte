<script context="module" lang="ts">
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

<script lang="ts">
  import Button from '$lib/components/Button.svelte'
  import { session } from '$app/stores'
  export let venue: Venue
</script>

<svelte:head>
  <title>Venuer - {venue.name}</title>
  <meta name="description" content={venue.description} />
  <meta property="og:title" content="{venue.name}, {venue.location.city}" />
  <meta property="og:description" content={venue.description} />
</svelte:head>

<h1>Hi there {$session.user?.id}</h1>

{#if $session.user && $session.user.id === venue.organizer}
  <strong>You are an organizer of this venue</strong>
  <p>To make changes to this event <a href="/me/organizing">go to your dashboard</a></p>
  <Button variant="text" size="sm">Edit venue</Button>
{:else}
  <strong>You are not an organizer of this venue</strong>
{/if}

<pre>{JSON.stringify(venue, null, 2)}</pre>
