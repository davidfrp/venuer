<script lang="ts">
  import IconButton from './IconButton.svelte'
  export let onReset: (() => void) | undefined = undefined
  export let label: string
  export let value: string
</script>

<div class="py-0.5 flex items-center">
  <button class="px-4 text-left" on:click>
    <div class="text-xs font-semibold">{label}</div>
    <div class="truncate">{value}</div>
  </button>
  {#if onReset}
    <div class="mr-4">
      <IconButton size="sm" on:click={onReset} ariaLabel="Clear dates">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </IconButton>
    </div>
  {/if}
</div>
<slot />
