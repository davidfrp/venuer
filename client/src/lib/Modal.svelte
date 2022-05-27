<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { fade, scale } from 'svelte/transition'
  import { browser } from '$app/env'

  export let title = ''
  export let isOpen = false
  export let focusRef: HTMLElement | null = null
  export let onRequestClose = () => {}

  $: if (isOpen) {
    focusRef?.focus()
  }

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onRequestClose()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onRequestClose()
    }
  }

  if (browser) {
    onMount(() => {
      window.addEventListener('keydown', handleKeyDown)
    })
  
    onDestroy(() => {
      window.removeEventListener('keydown', handleKeyDown)
    })
  }
</script>

{#if isOpen}
  <div class="fixed z-10 top-0 right-0 bottom-0 left-0 before:bg-[rgb(25,28,35)] before:opacity-50
    before:fixed before:top-0 before:left-0 before:right-0 before:bottom-0"
    on:click={handleOverlayClick} in:fade={{duration: 150}} out:fade={{duration: 150}}>
    <aside role="dialog" class="fixed bottom-0 z-20 shadow-2xl
      max-h-[calc(100vh-2rem)] w-full bg-white rounded-t-xl
      overflow-hidden pb-[env(safe-area-inset-bottom)] sm:rounded-b-xl
      sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2
      sm:bottom-auto sm:max-w-md" in:scale={{start: 1.2, duration: 200}}>
      <header class="p-6 pb-0 pt-8">
        <h1 class="text-2xl font-semibold">{title}</h1>
      </header>
      <div class="p-6 max-h-[calc(100vh-2rem)] 
        overflow-hidden overflow-y-auto">
        <slot />
      </div>
    </aside>
  </div>
{/if}
