<script lang="ts">
  import { browser } from '$app/env'
  import { scale } from 'svelte/transition'
  import { onDestroy, onMount } from 'svelte'

  export let isOpen: boolean = false
  export let onRequestClose: () => void
  export let anchor: 'start' | 'center' | 'end' = 'start'

  let ref: HTMLDivElement

  $: if (isOpen) {
    if (browser) {
      setTimeout(() => {
        document.addEventListener('click', handleClick)
      }, 0)
    }
  } else {
    if (browser) {
      document.removeEventListener('click', handleClick)
    }
  }

  if (browser) {
    onDestroy(() => {
      if (isOpen) {
        document.removeEventListener('click', handleClick)
      }
    })
  }

  const handleClick = (e: MouseEvent) => {
    if (browser && !ref.contains(e.target as Node)) {
      onRequestClose()
    }
  }

  $: alignStyles = anchor === 'start' ? `left-0` : anchor === 'end'
    ? `right-0` : `left-1/2 -translate-x-1/2`
</script>

{#if isOpen}
  <div bind:this={ref} class={`absolute top-full mt-3 
    p-6 bg-white shadow border rounded-xl ${alignStyles}`}
    in:scale={{ start: 1.1, duration: 200 }}
  >
    <slot />
  </div>
{/if}