<script lang="ts">
  type Variant = 'text' | 'contained' | 'outlined' | 'none'
  type Type = 'submit' | 'reset' | 'button'

  $: sizeStyles = size === 'sm' ? 'px-3 py-1 min-w-0' : (
    size === 'base' ? 'p-2.5 min-w-[4rem] ' : (
      size === 'md' ? 'px-6 py-3.5 min-w-[4rem] ' : 'w-full h-14 min-w-[4rem]'
    )
  )

  $: baseStyles = variant !== 'none' ? `relative w-full h-full
    flex justify-center items-center leading-5 text-opacity-[0.85] 
    font-semibold bg-brand rounded-lg transition-colors 
    whitespace-nowrap ${sizeStyles}` : ''

  $: containedStyles = variant === 'contained' ? `text-white text-opacity-100 
    bg-opacity-100 hover:bg-opacity-90` : ''
  
  $: textStyles = variant === 'text' ? `text-brand bg-opacity-0 
    hover:bg-opacity-10` : ''

  $: outlinedStyles = variant === 'outlined' ? `text-brand 
    bg-opacity-0 hover:bg-opacity-10 border-2 border-brand border-opacity-50 
    hover:border-opacity-100` : ''
  
  $: disabledStyles = isDisabled || isLoading ? `opacity-[0.38] pointer-events-none` : ''
  
  $: styles = [baseStyles, containedStyles, outlinedStyles, textStyles, disabledStyles].join(' ')

  export let variant: Variant = 'none'
  export let type: Type = 'submit'
  export let size: 'sm' | 'base' | 'md' | 'lg' = 'base'
  export let isDisabled: boolean = false
  export let isLoading: boolean = false
  export let focusRef: HTMLButtonElement | null = null
</script>

<div>
  <button {type} class={styles} on:click bind:this={focusRef}>
    {#if isLoading}
      <div class="absolute animate-spin h-7 w-7 rounded-full border-4 border-transparent border-r-white"></div>
    {/if}
    <div class:invisible={isLoading}>
      <slot />
    </div>
  </button>
</div>
