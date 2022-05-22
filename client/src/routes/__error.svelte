<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ error }) => ({ props: { error } })
</script>

<script lang="ts">
  export let error: Error
</script>

<h1>An error occurred</h1>
<pre>{JSON.stringify(error, null, 2)}</pre>
<p>{error.message}</p>
