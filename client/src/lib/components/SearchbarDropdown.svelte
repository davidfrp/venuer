<script lang="ts">
  import OverlayWrapper from "./OverlayWrapper.svelte"

  export let isOpen: boolean = false
  export let onRequestClose: () => void
</script>

{#if isOpen}
  <OverlayWrapper {onRequestClose}>
    <ul class="py-2">
      <li>Lorem ipsum dolor sit amet</li>
      <li>consectetur, adipisicing elit.</li>
      <li>Perferendis eligendi sint,</li>
      <li>dolores voluptate aut sunt,</li>
      <li>libero id ad perspiciatis non</li>
    </ul>
  </OverlayWrapper>
{/if}
