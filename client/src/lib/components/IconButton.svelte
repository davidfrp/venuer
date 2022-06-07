<script lang="ts">
  export let text: string = ''
  export let ariaLabel: string = ''
  export let size: 'sm' | 'md' | 'lg' = 'md'

  $: iconSizeStyles = size === 'sm' ? 'h-4 w-4' : (size === 'lg' ? 'h-14 w-14' : 'h-5 w-5')
  $: buttonSizeStyles = size === 'sm' ? 'p-1' : (size === 'lg' ? 'h-14 w-14' : 'p-2.5')
</script>

<button class={`bg-gray-100 hover:bg-gray-200 active:bg-gray-300
  transition-colors rounded-full flex items-center ${buttonSizeStyles}`} 
  on:click aria-label={ariaLabel}
>
  <div class={`flex gap-2 items-center ${iconSizeStyles}`}>
    <slot />
  </div>
  {#if text}
    <div class="pl-2 pr-1">
      {text}
    </div>
  {/if}
</button>