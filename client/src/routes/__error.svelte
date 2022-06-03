<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  export const load: Load = async ({ error, status }) => ({ props: { error, status } })
</script>

<script lang="ts">
  import { dev } from '$app/env'
  export let error: Error
  export let status: number
</script>

<div class="p-6 mx-auto space-y-6 max-w-none sm:max-w-2xl min-h-full text-center ">
  <h1 class="font-semibold text-6xl">Oops, something went wrong!</h1>
  <p class="text-2xl">{error.message}</p>
  {#if dev && error.stack}
    <details class="w-full open:bg-slate-200">
      <summary class="block p-4 bg-inherit cursor-pointer select-none font-semibold">More details</summary>
      <div class="p-4 text-left bg-slate-100">
        <h2 class="font-semibold text-xl">{status}</h2>
        <code class="text-sm">{error.stack}</code>
      </div>
    </details>
  {/if}
</div>
