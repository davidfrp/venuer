<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { NotFoundError } from '$lib/errors'
  import { getEventBySlug } from '$lib/eventService'

  export const load: Load = async ({ params, fetch }) => {
    const [event, status] = await getEventBySlug(params.slug, fetch)
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
  import { session } from '$app/stores'
  export let event: Event
</script>

<h1>Hi there {$session.user?.id}</h1>

<pre>{JSON.stringify(event, null, 2)}</pre>
