<script lang="ts">
  import Modal from '$lib/components/Modal.svelte'
  import SearchbarDropdown from '$lib/components/SearchbarDropdown.svelte'

  export let label: string
  export let value: string

  let isOpen = false
</script>

<div class="py-0.5 flex items-center">
  <Modal
    onRequestClose={() => isOpen = false}
    isTopMost={false}
    size="lg"
    {isOpen}
  >
    <slot />
  </Modal>
  <!-- <SearchbarDropdown {isOpen} onRequestClose={() => isOpen = false}>
    <slot />
  </SearchbarDropdown> -->
  <button class="px-4 text-left" on:click={() => isOpen = true}>
    <div class="text-xs font-semibold">{label}</div>
    <div class="truncate">{value}</div>
  </button>
</div>
