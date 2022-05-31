<script lang="ts">
  type Variant = 'text' | 'contained' | 'outlined' | 'none'
  type Type = 'submit' | 'reset' | 'button'

  $: baseStyles = variant !== 'none' ? `py-2 px-4 min-w-[4rem] capitalize 
    text-opacity-[0.85] font-semibold bg-brand
    transition-colors w-full h-full` : ''

  $: containedStyles = variant === 'contained' ? `text-white text-opacity-100 
    bg-opacity-100 hover:bg-opacity-90` : ''
  
  $: textStyles = variant === 'text' ? `text-brand bg-opacity-0 
    hover:bg-opacity-10` : ''

  $: outlinedStyles = variant === 'outlined' ? `text-brand 
    bg-opacity-0 hover:bg-opacity-10 border-2 border-brand border-opacity-50 
    hover:border-opacity-100` : ''
  
  $: sizeStyles = size === 'sm' ? `px-3 py-1` : size === 'lg' ? `w-full h-14` : ''
  
  $: styles = [baseStyles, containedStyles, outlinedStyles, textStyles].join(' ')

  export let variant: Variant = 'none'
  export let type: Type = 'submit'
  export let size: 'sm' | 'md' | 'lg' = 'md'
</script>

<div class={sizeStyles + ' bg-white'}>
  <button {type} class={styles} on:click>
    <slot />
  </button>
</div>
