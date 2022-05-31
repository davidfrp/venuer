<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
	import { get } from '$lib/api'
  import { session } from '$app/stores'

  export const load: Load = async ({ fetch }) => {
		const [venues] = await get('/venues', fetch)
		const [events] = await get('/events', fetch)
    return {
      props: {
        venues,
				events
      }
    }
  }
</script>

<script lang="ts">
  export let venues: any[]
  export let events: any[]
</script>

{#if events.length === 0}
  <p>No events found</p>
{:else}
  <ul>
    {#each events as event}
      <li>{JSON.stringify(event, null, 2)}</li>
    {/each}
  </ul>
{/if}

<pre>{JSON.stringify($session, null, 2)}</pre>


<ul>
	{#each venues as venue}
		<li>
			<pre>{JSON.stringify(venue, null, 2)}</pre>
		</li>
	{/each}
</ul>
