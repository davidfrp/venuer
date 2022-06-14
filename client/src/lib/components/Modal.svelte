<script lang="ts">
  import { scale } from 'svelte/transition'
  import Overlay from './Overlay.svelte'

  export let size: 'sm' | 'md' | 'lg' = 'md'
  export let id: string | null = null
  export let title: string = ''
  export let isOpen: boolean = false
  export let onRequestClose: () => void
  export let ignoreNavbar: boolean = true
  
  let focusRef: HTMLElement
  $: isOpen && focusRef?.focus()

  $: sizeStyles = size === 'sm' ? 'sm:max-w-sm' : (size === 'lg' ? 'sm:max-w-3xl' : 'sm:max-w-md')
</script>

{#if isOpen}
  <Overlay {onRequestClose} {ignoreNavbar}>
    <aside {id} role="dialog" class={`fixed z-50 bottom-0 shadow-2xl
      w-full bg-white rounded-t-xl border
      overflow-hidden pb-[env(safe-area-inset-bottom)] sm:rounded-b-xl
      sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2
      sm:bottom-auto ${sizeStyles}`} in:scale={{start: 1.1, duration: 200}}
      bind:this={focusRef}
      tabindex="-1"
    >
      {#if title}
        <header class="p-6 pb-0 pt-8">
          <h1 class="text-2xl font-semibold">{title}</h1>
        </header>
      {/if}
      <div class="p-6 max-h-[calc(80vh-4rem)] sm:max-h-[calc(100vh-4rem-4rem)] overflow-hidden overflow-y-auto">
        <slot />
      </div>
    </aside>
  </Overlay>
{/if}
