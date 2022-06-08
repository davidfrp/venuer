<script lang="ts">
  type Variant = 'text' | 'contained' | 'outlined' | 'none'
  type Type = 'submit' | 'reset' | 'button'

  $: sizeStyles = size === 'sm' ? 'px-3 py-1' : size === 'lg' 
    ? 'w-full h-14' : 'p-2.5'

  $: baseStyles = variant !== 'none' ? `min-w-[4rem] leading-5
    text-opacity-[0.85] font-semibold bg-brand rounded-md
    transition-colors w-full h-full ${sizeStyles}` : ''

  $: containedStyles = variant === 'contained' ? `text-white text-opacity-100 
    bg-opacity-100 hover:bg-opacity-90` : ''
  
  $: textStyles = variant === 'text' ? `text-brand bg-opacity-0 
    hover:bg-opacity-10` : ''

  $: outlinedStyles = variant === 'outlined' ? `text-brand 
    bg-opacity-0 hover:bg-opacity-10 border-2 border-brand border-opacity-50 
    hover:border-opacity-100` : ''
  
  $: disabledStyles = isDisabled ? `opacity-[0.38] pointer-events-none` : ''
  
  $: styles = [baseStyles, containedStyles, outlinedStyles, textStyles, disabledStyles].join(' ')

  export let variant: Variant = 'none'
  export let type: Type = 'submit'
  export let size: 'sm' | 'md' | 'lg' = 'md'
  export let isDisabled: boolean = false
</script>

<div>
  <button {type} class={styles} on:click>
    <slot />
  </button>
</div>
