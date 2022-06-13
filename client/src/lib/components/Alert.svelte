<script lang="ts">
  import { slide } from 'svelte/transition'
  import { onMount } from 'svelte'

  export let title: string = ''
  export let message: string

  let alertRef: HTMLElement

  $: if (message) alertRef?.scrollIntoView({ behavior: 'smooth' })
</script>

<div
  role="alert"
  bind:this={alertRef}
  class="bg-rose-50 text-rose-800 px-6 py-4 rounded-lg"
  in:slide|local out:slide|local
>
  {#if title}
    <h1 class="font-semibold text-lg mb-1">{title}</h1>
  {/if}
  {#key message}
    <p in:slide|local out:slide|local>{message}</p>
  {/key}
</div>
