<script lang="ts">
  export let ariaLabel: string
  export let isDisabled: boolean = false
  export let size: 'sm' | 'md' | 'lg' = 'md'
  
  $: iconSizeStyles = size === 'sm' ? 'h-4 w-4' : (size === 'lg' ? 'h-14 w-14' : 'h-5 w-5')
  
  $: buttonSizeStyles = size === 'sm' ? 'p-1' : (size === 'lg' ? 'h-14 w-14' : 'p-2.5')

  $: disabledStyles = isDisabled ? `opacity-[0.38] pointer-events-none` : ''
</script>

<button type="button" class={`transition-all rounded-full flex items-center 
  active:scale-90 ${buttonSizeStyles} ${disabledStyles}`} 
  on:click aria-label={ariaLabel} title={ariaLabel}
  tabindex={isDisabled ? -1 : 0}
>
  <div class={`${iconSizeStyles}`}>
    <slot />
  </div>
</button>