<script lang="ts">
  export let ariaLabel: string
  export let isPinging: boolean = false
  export let size: 'sm' | 'md' | 'lg' = 'md'
  export let variant: 'default' | 'brand' = 'default' // TODO Remove variants from icon button?
  
  $: iconSizeStyles = size === 'sm' ? 'h-4 w-4' : (size === 'lg' ? 'h-14 w-14' : 'h-5 w-5')
  
  $: buttonSizeStyles = size === 'sm' ? 'p-1' : (size === 'lg' ? 'h-14 w-14' : 'p-2.5')

  $: variantStyles = variant === 'brand' ? `text-white bg-brand hover:bg-opacity-80 
    active:bg-opacity-90` : 'text-gray-500 bg-gray-100 border hover:bg-gray-200 active:bg-gray-300'

  $: pingingStyles = isPinging ? `relative before:absolute before:left-0 before:w-full 
    before:h-full before:rounded-full before:bg-inherit before:bg-opacity-10 
    before:animate-ping before:duration-1000` : ''
</script>

<button type="button" class={`transition-all rounded-full flex items-center 
  active:scale-90 ${buttonSizeStyles} ${variantStyles} ${pingingStyles}`} 
  on:click aria-label={ariaLabel} title={ariaLabel}
>
  <div class={`${iconSizeStyles}`}>
    <slot />
  </div>
</button>