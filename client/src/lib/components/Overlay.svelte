<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { fade } from 'svelte/transition'
  import { browser } from '$app/env'

  export let onRequestClose: () => void
  export let ignoreNavbar: boolean = false

  let ref: HTMLDivElement
  let portalElement: HTMLDivElement

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onRequestClose()
    }
  }

  if (browser) {
    onMount(async () => {
      portalElement = document.createElement('div')
      document.body.appendChild(portalElement)
      portalElement.appendChild(ref)

      // Set event listeners upon next macrotask.
      setTimeout(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('click', handleClick)
        document.body.classList.add('overflow-hidden')
      }, 0)
    })
    
    onDestroy(() => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClick)
      document.body.classList.remove('overflow-hidden')
      document.body.removeChild(portalElement)
    })
  }

  const handleClick = (e: MouseEvent) => {
    // If not the overlay, or a child of it, close the modal.
    if (ref === e.target) {
      onRequestClose()
    }
  }
</script>

<div class="fixed top-0 right-0 bottom-0 left-0 before:bg-[rgb(25,28,35)] before:opacity-50
  before:fixed before:top-0 before:left-0 before:right-0 before:bottom-0 backdrop-blur-sm"
  bind:this={ref} class:z-10={ignoreNavbar} in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}
>
  <slot />
</div>