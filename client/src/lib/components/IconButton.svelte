<script lang="ts">
  export let ariaLabel: string
  export let isDisabled: boolean = false
  export let size: 'sm' | 'md' | 'lg' = 'md'
  export let variant: 'default' | 'brand' = 'default' // TODO Remove variants from icon button?
  
  $: iconSizeStyles = size === 'sm' ? 'h-4 w-4' : (size === 'lg' ? 'h-14 w-14' : 'h-5 w-5')
  
  $: buttonSizeStyles = size === 'sm' ? 'p-1' : (size === 'lg' ? 'h-14 w-14' : 'p-2.5')

  $: variantStyles = variant === 'brand' ? `text-white bg-brand hover:bg-opacity-80 
    active:bg-opacity-90` : 'text-gray-500 bg-gray-100 border hover:bg-gray-200 active:bg-gray-300'

  $: disabledStyles = isDisabled ? `opacity-[0.38] pointer-events-none` : ''
</script>

<button type="button" class={`transition-all rounded-full flex items-center 
  active:scale-90 ${buttonSizeStyles} ${variantStyles} ${disabledStyles}`} 
  on:click aria-label={ariaLabel} title={ariaLabel}
  tabindex={isDisabled ? -1 : 0}
>
  <div class={`${iconSizeStyles}`}>
    <slot />
  </div>
</button>