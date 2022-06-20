<script lang="ts">
  import { browser } from '$app/env'
  import { onMount, onDestroy } from 'svelte'

  if (browser) {
    onMount(() => {
      document.documentElement.style.setProperty('--page-px', '12rem')
    })

    onDestroy(() => {
      document.documentElement.style.removeProperty('--page-px')
    })
  }
</script>

<slot />
